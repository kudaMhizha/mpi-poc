-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "phoneNumber" TEXT,
    "confirmed" BOOLEAN NOT NULL,
    "status" TEXT,
    "jobDescription" TEXT,
    "roleId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
