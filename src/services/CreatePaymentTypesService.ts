import { PaymentTypes, PrismaClient } from "@prisma/client";

interface IRequest {
  name: string;
}

const prisma = new PrismaClient()

export async function CreatePaymentTypesService({
  name,
}: IRequest): Promise<PaymentTypes> {

  if (!name) {
    throw new Error("Incomplete data")
  }


  const result = await prisma.paymentTypes.create({
    data: {
      description: name,
    }
  })

  return result
}