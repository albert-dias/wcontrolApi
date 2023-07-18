import { PrismaClient, Users } from "@prisma/client";
import { hash } from "bcryptjs";

interface IRequest {
  email: string;
  name: string;
  lastname: string;
  phone: string;
  password: string;
}

const prisma = new PrismaClient()

export async function CreateUserService({
  email,
  name,
  lastname,
  phone,
  password
}: IRequest): Promise<Users> {

  if (!email || !name || !lastname || !phone || !password) {
    throw new Error("Incomplete data")
  }

  const hashPass = await hash(password, 8);

  const result = await prisma.users.create({
    data: {
      email,
      name,
      lastname,
      phone,
      password: hashPass,
    }
  })

  return result
}