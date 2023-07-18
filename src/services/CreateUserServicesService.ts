import { PrismaClient, UserServices } from "@prisma/client";

interface IRequest {
  description: string;
  value: number;
  user_id: string;
}

const prisma = new PrismaClient();

export async function CreateUserServicesService({
  description,
  value,
  user_id,
}: IRequest): Promise<UserServices> {
  if (!description || !value || !user_id) {
    throw new Error("Incomplete data");
  }

  const result = await prisma.userServices.create({
    data: {
      description,
      value,
      user_id,
    },
  });

  return result;
}
