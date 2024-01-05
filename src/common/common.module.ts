import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [DatabaseModule, ConfigModule, QueueModule]
})
export class CommonModule {}
