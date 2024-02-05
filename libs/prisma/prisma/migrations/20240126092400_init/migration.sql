-- CreateEnum
CREATE TYPE "Role_Type" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "phoneNumber" TEXT,
    "confirmed" BOOLEAN NOT NULL,
    "status" TEXT,
    "jobDescription" TEXT,
    "roleId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
