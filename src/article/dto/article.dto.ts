// src/article/dto/create-article-with-blocks.dto.ts
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateBlockDto {
  @IsString() // BlockType теперь строка
  type: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  svgData?: any;

  @IsOptional()
  @IsString()
  title?: string;
}

export class CreateArticleWithBlocksDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlockDto)
  blocks: CreateBlockDto[];
}
