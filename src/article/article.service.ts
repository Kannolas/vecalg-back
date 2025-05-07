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
    updateArticleWithBlocksDto: CreateArticleWithBlocksDto,
  ): Promise<Article> {
    // 1. Удаляем старые blocks
    await this.prisma.block.deleteMany({
      where: { articleId: id },
    });

    // 2. Создаем новые blocks
    const createBlocks = updateArticleWithBlocksDto.blocks.map((block) => ({
      articleId: id,
      type: block.type,
      title: block.title,
      content: block.content,
      svgData: block.svgData,
    }));

    // 3. Обновляем article + создаем новые blocks через nested createMany
    return this.prisma.article.update({
      where: { id },
      data: {
        title: updateArticleWithBlocksDto.title,
        blocks: {
          createMany: {
            data: createBlocks,
          },
        },
      },
      include: { blocks: true }, // вернуть blocks вместе с article
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
