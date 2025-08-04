import { prisma } from "@/lib/prisma";

export async function getPublication() {
  return await prisma.publication.findMany({
  });
}


export async function getPublicationSample() {
  return await prisma.publicationSample.findMany({});
}