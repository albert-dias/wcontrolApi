import { UserServices, PrismaClient } from "@prisma/client";

interface IRequest {
  user_id: string;
}

const prisma = new PrismaClient();

export async function ListUserServicesService({
  user_id,
}: IRequest): Promise<UserServices[]> {
  const result = await prisma.userServices.findMany({
    where: {
      user_id,
    },
  });

  return result;
}
