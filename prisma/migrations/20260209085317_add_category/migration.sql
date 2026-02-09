-- CreateEnum
CREATE TYPE "Category" AS ENUM ('GULBI_10', 'GULBI_20', 'BARLEY_GULBI', 'FERMENTED_ETC');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'GULBI_10';
