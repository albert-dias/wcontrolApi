import { Colors, PrismaClient } from "@prisma/client";

interface IRequest {
  name: string;
  hex: string;
}

const prisma = new PrismaClient();

export async function CreateColorService({
  name,
  hex,
}: IRequest): Promise<Colors> {
  if (!name || !hex) {
    throw new Error("Incomplete data");
  }

  const result = await prisma.colors.create({
    data: {
      description: name,
      value: hex,
    },
  });

  return result;
}
