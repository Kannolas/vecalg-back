// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Экспортируем PrismaService, чтобы его можно было использовать в других модулях
})
export class PrismaModule {}
