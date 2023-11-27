/*
  Warnings:

  - Made the column `userTypeId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userTypeId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userTypeId" SET NOT NULL,
ALTER COLUMN "userTypeId" SET DEFAULT 3;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
