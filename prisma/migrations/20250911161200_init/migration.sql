-- CreateEnum
CREATE TYPE "public"."HeroType" AS ENUM ('HERO', 'VILLAIN');

-- CreateTable
CREATE TABLE "public"."Superhero" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "realName" TEXT,
    "originDescription" TEXT NOT NULL,
    "catchPhrase" TEXT,
    "type" "public"."HeroType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SuperPower" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SuperPower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_HeroSuperPowers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_HeroSuperPowers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Superhero_nickname_key" ON "public"."Superhero"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "SuperPower_name_key" ON "public"."SuperPower"("name");

-- CreateIndex
CREATE INDEX "_HeroSuperPowers_B_index" ON "public"."_HeroSuperPowers"("B");

-- AddForeignKey
ALTER TABLE "public"."_HeroSuperPowers" ADD CONSTRAINT "_HeroSuperPowers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."SuperPower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_HeroSuperPowers" ADD CONSTRAINT "_HeroSuperPowers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
