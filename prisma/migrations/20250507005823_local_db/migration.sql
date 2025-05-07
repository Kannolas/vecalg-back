-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_articleId_fkey";

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
