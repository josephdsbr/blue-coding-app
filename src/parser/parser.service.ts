import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ParserService {
    constructor(@InjectQueue("parser") private parserQueue: Queue) {}

    async process(obj: string, className: string): Promise<void> {
        this.parserQueue.add('file', { file: obj, className })
    }
}
