import { PrismaClient, Transaction } from "@prisma/client";

interface IRequest {
  transaction_id: string;
  payment_id?: string;
}

const prisma = new PrismaClient();

export async function UpdateTransactionService({
  transaction_id,
  payment_id,
}: IRequest): Promise<Transaction> {
  if (!transaction_id || !payment_id) {
    throw new Error("Incomplete data");
  }

  const result = await prisma.transaction.update({
    where: {
      id: transaction_id,
    },
    data: {
      payment_id,
    },
  });

  return result;
}
