import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    ParserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
