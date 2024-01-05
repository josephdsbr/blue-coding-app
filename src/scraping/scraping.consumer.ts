import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "bull";
import { load, CheerioAPI } from 'cheerio'
import { Shortener } from "src/common/database/entities/shortener.entity";
import { Repository } from "typeorm";

@Processor("scraping")
export class ScrapingConsumer {
    constructor(@InjectRepository(Shortener) private shortnerRepository: Repository<Shortener>) {}

    private readonly logger = new Logger(ScrapingConsumer.name);

    @Process('scraping-headers')
    async execute(job: Job<unknown>) {
        // @ts-ignore
        const entity = job.data.entity as Shortener
        const dom = fetch(entity.url).then(async (response) => {
            if (response.ok) {
                const html = load(await response.text());
                const title = html('head title').text()
                entity.title = title;
                this.shortnerRepository.save(entity)
            }
        })

        this.logger.log(JSON.stringify(job.data))
    }
}