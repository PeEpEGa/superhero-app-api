/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Image";

-- CreateTable
CREATE TABLE "public"."SuperheroImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "superheroId" INTEGER NOT NULL,

    CONSTRAINT "SuperheroImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SuperheroImage" ADD CONSTRAINT "SuperheroImage_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "public"."Superhero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
