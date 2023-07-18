import { Colors, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ListColorService(): Promise<Colors[]> {
  const result = await prisma.colors.findMany({
    orderBy: {
      value: "asc",
    },
  });

  return result;
}
