import { prisma } from "@/lib/prisma";
import { Publication } from "../types/types";

export async function updatePublication(data: Publication) {
  const existingPublication = await prisma.publication.findUnique({
    where: { publication_id: data.publication_id },
  });

  if (!existingPublication) {
    throw new Error("Publication not found");
  }

  // 2. Validate stock after subtracting user input
  const newStock = existingPublication.count - Number(data.count);
  if (newStock < 0) {
    throw new Error(`Invalid count: stock cannot go below zero. Current stock is ${existingPublication.count}`);
  }

  // 3. Update with new count (reduce stock by data.count)
  return await prisma.publication.update({
    where: { publication_id: data.publication_id },
    data: {
      count: newStock,
    },
  });
}
