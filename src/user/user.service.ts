import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectQueue('users') private usersQueue: Queue
    ) {
        this.usersQueue.on('error', (err) => this.logger.error(err))
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        try {
            this.logger.log('Sending user id to queue')
            this.logger.log('User queue is ready:', await this.usersQueue.isReady())

            const job = await this.usersQueue.add('csv', { userId: id })
        } catch (error) {
            this.logger.error(error)
        } finally {
            this.logger.log('sent user id to queue')
        }
        
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
