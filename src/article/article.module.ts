import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Импортируем PrismaModule

@Module({
  imports: [PrismaModule], // Добавляем PrismaModule в imports
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
