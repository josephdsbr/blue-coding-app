import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortener } from 'src/common/database/entities/shortener.entity';
import { BullModule } from '@nestjs/bull';

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
  providers: [ShortenerService],
  controllers: [ShortenerController]
})
export class ShortenerModule {}
