-- CreateTable
CREATE TABLE "public"."Publication" (
    "id" SERIAL NOT NULL,
    "publication_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publication_publication_id_key" ON "public"."Publication"("publication_id");
