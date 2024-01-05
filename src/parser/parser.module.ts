import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { BullModule } from '@nestjs/bull';
import { ParserController } from './parser.controller';
import { ParserConsumer } from './parser.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
    }),
    BullModule.registerQueue({
      name: 'parser'
    })
  ],
  providers: [ParserService, ParserConsumer],
  controllers: [ParserController]
})
export class ParserModule {}
