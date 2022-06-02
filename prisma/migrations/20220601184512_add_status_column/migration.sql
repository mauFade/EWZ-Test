/*
  Warnings:

  - You are about to drop the `Deals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Deals";

-- CreateTable
CREATE TABLE "Deal" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "products" INTEGER NOT NULL,
    "oportunityId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);
