import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { PrismaModule } from '../prisma/prisma.module'; // Импортируем PrismaModule

@Module({
  imports: [UserModule, ArticleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService], // PrismaService больше не нужен здесь, так как он в PrismaModule
})
export class AppModule {}
