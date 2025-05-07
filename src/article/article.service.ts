/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/article/article.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Article } from '@prisma/client';
import { CreateArticleWithBlocksDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async getAllArticles(): Promise<Article[]> {
    return this.prisma.article.findMany({ include: { blocks: true } });
  }

  async getArticleById(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
      include: { blocks: true }, // Важно: включаем блоки!
    });
  }

  async createArticle(title: string): Promise<Article> {
    return this.prisma.article.create({
      data: { title },
    });
  }
  async updateArticle(
    id: number,
    title: string,
    blocks: Prisma.BlockCreateInput[],
  ): Promise<Article> {
    // Проверка на наличие блоков
    if (!blocks || blocks.length === 0) {
      throw new Error('Blocks cannot be empty');
    }

    // Обновление статьи и блоков
    return this.prisma.article.update({
      where: { id },
      data: {
        title, // Обновляем только title
        blocks: {
          // Удаляем старые блоки, если они есть
          deleteMany: {
            articleId: id,
          },
          // Создаём новые блоки
          createMany: {
            data: blocks.map((block) => ({
              type: block.type,
              content: block.content,
              svgData: block.svgData,
              title: block.title,
              articleId: id, // связываем с текущей статьёй
            })),
          },
        },
      },
      include: { blocks: true }, // Чтобы вернуть обновлённые блоки
    });
  }

  async deleteArticle(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: { id },
      include: { blocks: true },
    });
  }
  async createArticleWithBlocks(
    data: CreateArticleWithBlocksDto,
  ): Promise<Article> {
    return this.prisma.article.create({
      data: {
        title: data.title,
        blocks: {
          create: data.blocks.map((blockData) => ({
            type: blockData.type,
            content: blockData.content,
            svgData: blockData.svgData,
            title: blockData.title,
          })),
        },
      },
      include: {
        blocks: true,
      },
    });
  }
}
