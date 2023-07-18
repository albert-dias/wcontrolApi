-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'ADMSYSTEM');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'USER';
