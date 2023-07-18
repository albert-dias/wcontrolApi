import { PrismaClient, Users } from "@prisma/client";
import { hash } from "bcryptjs";

interface IRequest {
  user_id: string;
}

const prisma = new PrismaClient()

export async function ShowUserService({
  user_id
}: IRequest): Promise<Users> {

  const result = await prisma.users.findUniqueOrThrow({
    where: {
      id: user_id
    }
  })

  return result
}