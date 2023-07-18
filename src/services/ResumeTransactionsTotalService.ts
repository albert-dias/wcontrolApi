import { PrismaClient, Transaction } from "@prisma/client";

interface IRequest {
  user_id: string;
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

export async function ResumeTransactionTotalService({
  user_id,
}: IRequest): Promise<IResponse> {
  if (!user_id) {
    throw new Error("Incomplete data");
  }

  const result = await prisma.transaction.findMany({
    where: {
      user_id,
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
