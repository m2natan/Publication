import { prisma } from "@/lib/prisma";

export async function getPublication() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return await prisma.publication.findMany({
    where: {
      createdAt: {
        gte: startOfMonth, // greater than or equal to first day of month
        lt: endOfMonth, // less than first day of next month
      },
    },
    select: {
      publication_id: true,
      count: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPublicationBySearch(search?: string) {
  if (search) {
    return await prisma.publication.findMany({
      where: {
        OR: [{ publication_id: { contains: search, mode: "insensitive" } }],
      },
      orderBy: { updatedAt: "desc" },
    });
  } else {
    return;
  }
}

export async function getPublicationSample() {
  return await prisma.publicationSample.findMany({});
}
