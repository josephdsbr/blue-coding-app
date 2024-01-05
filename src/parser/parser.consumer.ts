import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { load, CheerioAPI } from 'cheerio'

@Processor("parser")
export class ParserConsumer {
    private readonly logger = new Logger(ParserConsumer.name);

    @Process('file')
    async execute(job: Job<unknown>) {
        // @ts-ignore
        const data = load(job.data.file);
        this.logger.log(JSON.stringify(job.data))
    }
}