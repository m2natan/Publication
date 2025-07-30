import { prisma } from "@/lib/prisma";

export async function getPublication() {
  return await prisma.publication.findMany({
  });
}
