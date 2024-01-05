import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor("parser")
export class ParserConsumer {
    private readonly logger = new Logger(ParserConsumer.name);

    @Process('file')
    async execute(job: Job<unknown>) {
        this.logger.log(JSON.stringify(job.data))
    }
}