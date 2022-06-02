-- CreateTable
CREATE TABLE "Deals" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "products" INTEGER NOT NULL,
    "oportunityId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deals_pkey" PRIMARY KEY ("id")
);
