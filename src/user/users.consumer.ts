import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('users')
export class UsersConsumer {
    private readonly logger = new Logger(UsersConsumer.name);

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}`)
    }

    @Process('csv')
    async execute(job: Job<unknown>) {
        this.logger.log(job)
    }
}