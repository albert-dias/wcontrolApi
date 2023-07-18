import { PrismaClient, Transaction } from "@prisma/client";

interface IRequest {
  user_id: string;
  service_id: string;
  color_id: string;
  payment_id?: string;
  car_plate: string;
  value: number;
}

const prisma = new PrismaClient();

export async function CreateTransactionService({
  user_id,
  service_id,
  color_id,
  payment_id,
  car_plate,
  value,
}: IRequest): Promise<Transaction> {
  if (!service_id || !color_id || !user_id || !payment_id || !car_plate) {
    throw new Error("Incomplete data");
  }

  const result = await prisma.transaction.create({
    data: {
      user_id,
      service_id,
      color_id,
      payment_id: payment_id ? payment_id : null,
      car_plate,
      value,
    },
  });

  return result;
}
