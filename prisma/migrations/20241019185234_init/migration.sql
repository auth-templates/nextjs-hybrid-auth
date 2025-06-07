-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('DRAFT', 'PENDING_SUBMISSION', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'CANCELED', 'IN_PROGRESS', 'COMPLETED', 'PARTIALLY_TAKEN');

-- CreateTable
CREATE TABLE "Leave" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
