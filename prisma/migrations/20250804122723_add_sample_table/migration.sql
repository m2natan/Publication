-- CreateTable
CREATE TABLE "public"."PublicationSample" (
    "id" SERIAL NOT NULL,
    "publication_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "PublicationSample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicationSample_publication_id_key" ON "public"."PublicationSample"("publication_id");
