-- DropForeignKey
ALTER TABLE "public"."SuperheroImage" DROP CONSTRAINT "SuperheroImage_superheroId_fkey";

-- AddForeignKey
ALTER TABLE "public"."SuperheroImage" ADD CONSTRAINT "SuperheroImage_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "public"."Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
