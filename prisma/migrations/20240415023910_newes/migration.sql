/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AudioFile` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `AudioFile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AudioFile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AudioFile_id_idx";

-- AlterTable
ALTER TABLE "AudioFile" DROP COLUMN "createdAt",
DROP COLUMN "filePath",
DROP COLUMN "userId";
