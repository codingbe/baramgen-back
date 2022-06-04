-- CreateTable
CREATE TABLE "Boss" (
    "id" SERIAL NOT NULL,
    "map" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gentime" INTEGER NOT NULL,
    "item" TEXT NOT NULL,

    CONSTRAINT "Boss_pkey" PRIMARY KEY ("id")
);
