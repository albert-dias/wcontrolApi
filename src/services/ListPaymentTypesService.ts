import { PaymentTypes, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ListPaymentTypesService(): Promise<PaymentTypes[]> {
  const result = await prisma.paymentTypes.findMany();

  return result;
}
