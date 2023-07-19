import { PrismaClient, Transaction } from "@prisma/client";

interface IRequest {
  user_id: string;
}

interface IInfoPayment {
  qtd: number;
  value: number;
}

interface IResponse {
  transactions: Transaction[];
  pix: IInfoPayment;
  money: IInfoPayment;
  card: IInfoPayment;
  total: IInfoPayment;
}

const prisma = new PrismaClient();

export async function ListTransactionsDayService({
  user_id,
}: IRequest): Promise<IResponse> {
  if (!user_id) {
    throw new Error("Incomplete data");
  }

  const today = new Date();

  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const year = today.getFullYear();

  const result = await prisma.transaction.findMany({
    where: {
      user_id,
      created_at: {
        lte: new Date(`${year}-${month}-${day}T23:59:59.999Z`),
        gte: new Date(`${year}-${month}-${day}T00:00:00.000Z`),
      },
    },
    include: {
      payment: true,
      service: true,
    },
  });

  const pix = result.reduce(
    (acc, item) => {
      return item.payment !== null && item.payment!.description === "PIX"
        ? {
            qtd: (acc.qtd += 1),
            value: (acc.value += item.service.value),
          }
        : acc;
    },
    { qtd: 0, value: 0 }
  );

  const card = result.reduce(
    (acc, item) => {
      return item.payment !== null &&
        item.payment!.description?.includes("CARTÃO")
        ? {
            qtd: (acc.qtd += 1),
            value: (acc.value += item.service.value),
          }
        : acc;
    },
    { qtd: 0, value: 0 }
  );

  const money = result.reduce(
    (acc, item) => {
      return item.payment !== null && item.payment!.description === "DINHEIRO"
        ? {
            qtd: (acc.qtd += 1),
            value: (acc.value += item.service.value),
          }
        : acc;
    },
    { qtd: 0, value: 0 }
  );

  const total = {
    qtd: pix.qtd + card.qtd + money.qtd,
    value: pix.value + card.value + money.value,
  };

  return {
    pix,
    money,
    card,
    total,
    transactions: result,
  };
}
