import { PrismaClient, Transaction } from "@prisma/client";

interface IRequest {
  user_id: string;
  date?: Date;
}

interface IInfoPayment {
  qtd: number;
  value: number;
}

interface IResponse {
  pix: IInfoPayment;
  money: IInfoPayment;
  card: IInfoPayment;
  transactions: Transaction[];
}

const prisma = new PrismaClient();

export async function ResumeTransactionService({
  user_id,
  date,
}: IRequest): Promise<IResponse> {
  if (!user_id) {
    throw new Error("Incomplete data");
  }

  const today = date ? new Date(date) : new Date();

  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const year = today.getFullYear();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const result = await prisma.transaction.findMany({
    where: {
      user_id,
      created_at: {
        lte: `${year}-${month}-${lastDay}T23:59:59.999Z`,
        gte: `${year}-${month}-01T00:00:00.000Z`,
      },
    },
    include: {
      payment: true,
      service: true,
    },
  });

  const pix = result.reduce(
    (acc: IInfoPayment, item) => {
      return item.payment?.description === "PIX"
        ? {
            qtd: (acc.qtd += 1),
            value: (acc.value += item.service.value),
          }
        : acc;
    },
    { qtd: 0, value: 0 }
  );

  const card = result.reduce(
    (acc: IInfoPayment, item) => {
      return item.payment?.description?.includes("CARTÃO")
        ? {
            qtd: (acc.qtd += 1),
            value: (acc.value += item.service.value),
          }
        : acc;
    },
    { qtd: 0, value: 0 }
  );

  const money = result.reduce(
    (acc: IInfoPayment, item) => {
      return item.payment?.description === "DINHEIRO"
        ? {
            qtd: (acc.qtd += 1),
            value: (acc.value += item.service.value),
          }
        : acc;
    },
    { qtd: 0, value: 0 }
  );

  return {
    pix,
    money,
    card,
    transactions: result,
  };
}
