import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ParserModule } from './parser/parser.module';
import { ShortenerModule } from './shortener/shortener.module';
import { ScrapingModule } from './scraping/scraping.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    ParserModule,
    ShortenerModule,
    ScrapingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
