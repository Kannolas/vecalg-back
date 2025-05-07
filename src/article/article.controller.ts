/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/article/article.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common'; // <--- Добавляем импорт
import { ArticleService } from './article.service';
import { CreateArticleWithBlocksDto } from './dto/article.dto';
import { Prisma } from '@prisma/client';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleWithBlocksDto: CreateArticleWithBlocksDto) {
    return this.articleService.createArticleWithBlocks(
      createArticleWithBlocksDto,
    );
  }

  @Get()
  findAll() {
    return this.articleService.getAllArticles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.getArticleById(parseInt(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('blocks') blocks: Prisma.BlockCreateInput[],
  ) {
    if (!blocks || blocks.length === 0) {
      throw new BadRequestException('Blocks are required');
    }

    // Логирование для отладки
    console.log('Received title:', title);
    console.log('Received blocks:', blocks);

    // Обновляем статью с блоками
    return this.articleService.updateArticle(parseInt(id), title, blocks);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.deleteArticle(parseInt(id));
  }
}
