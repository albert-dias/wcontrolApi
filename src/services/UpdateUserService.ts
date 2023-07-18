import { PrismaClient, Users } from "@prisma/client";
import { hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  avatar_url: string;
}

const prisma = new PrismaClient()

export async function UpdateUserService({
  user_id,
  avatar_url
}: IRequest): Promise<Users> {

  const result = await prisma.users.update({
    where: {
      id: user_id
    },
    data: {
      avatar: avatar_url
    }
  })

  return result
}