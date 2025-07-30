import { prisma } from "@/lib/prisma";
import { Publication } from "../types/types";

export async function upsertPublication(data: Publication) {
  return await prisma.publication.upsert({
    where: { publication_id: data.publication_id },
    update: {
      count: {
        increment: data.count,
      },
    },
    create: {
      publication_id: data.publication_id,
      count: data.count,
    },
  });
}
