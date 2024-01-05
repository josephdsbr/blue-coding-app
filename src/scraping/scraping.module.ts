import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { BullModule } from '@nestjs/bull';
import { ScrapingConsumer } from './scraping.consumer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortener } from 'src/common/database/entities/shortener.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shortener]),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
    }),
    BullModule.registerQueue({
      name: 'scraping'
    })
  ],
  providers: [ScrapingService, ScrapingConsumer]
})
export class ScrapingModule {}
