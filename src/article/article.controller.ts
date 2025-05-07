// src/article/article.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'; // <--- Добавляем импорт
import { ArticleService } from './article.service';
import { CreateArticleWithBlocksDto } from './dto/article.dto';

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
  update(
    @Param('id') id: string,
    updateArticleWithBlocksDto: CreateArticleWithBlocksDto,
  ) {
    return this.articleService.updateArticle(
      parseInt(id),
      updateArticleWithBlocksDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.deleteArticle(parseInt(id));
  }
}
