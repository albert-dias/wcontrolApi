import { UserServices, PrismaClient } from "@prisma/client";

interface IRequest {
  service_id: string;
  value: number;
  description: string;
}

const prisma = new PrismaClient();

export async function UpdateUserServicesService({
  service_id,
  value,
  description,
}: IRequest): Promise<UserServices> {
  
  const result = await prisma.userServices.update({
    where: {
      id: service_id,
    },
    data: {
      value,
      description,
    },
  });

  return result;
}
