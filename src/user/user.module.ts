import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueueModule } from 'src/common/queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { UsersConsumer } from './users.consumer';

@Module({
  providers: [UserService, UsersConsumer],
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
    }),
    BullModule.registerQueue({
      name: 'users'
    })
  ],
  
  controllers: [UserController]
})
export class UserModule {}
