import { prisma } from "@/lib/prisma";

export async function getPublication() {
  return await prisma.publication.findMany({
  });
}

export async function getPublicationBySearch(search?: string){
  if(search){
    return await prisma.publication.findMany({
      where:{
        OR:[
          {publication_id: {contains: search, mode: 'insensitive'}}
        ],
      },
      orderBy: {createdAt: 'desc'},
    })
  }else{
    return
  }
}

export async function getPublicationSample() {
  return await prisma.publicationSample.findMany({});
}