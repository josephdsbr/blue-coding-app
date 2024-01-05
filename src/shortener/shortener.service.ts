import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Shortener } from 'src/common/database/entities/shortener.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortenerService {
    private readonly logger = new Logger(ShortenerService.name);
    constructor(
        @InjectRepository(Shortener) private shortnerRepository: Repository<Shortener>,
        @InjectQueue("scraping") private scrapingQueue: Queue
        ) {}

    private alphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    private base: number = this.alphabet.length

    async create(uri: string): Promise<Shortener> {
        const entity: Shortener = new Shortener(uri) 
        return await this.shortnerRepository.save(entity)
    }

    async findByUri(uri: string): Promise<Shortener | null> {
        return this.shortnerRepository.findOne({ where: { url: uri } })
    }

    async findById(id: number): Promise<Shortener | null> {
        return this.shortnerRepository.findOneBy({ id })
    }

    async encodeURI(uri: string) {
        let shortner = await this.findByUri(uri)

        if (!shortner) {
            this.logger.log('URI doesn\' exist on database yet, creating a new one')
            shortner = await this.create(uri)
            await this.scrapingQueue.add('scraping-headers', { entity: shortner })
        }

         // Based on ID
         let num = shortner.id;
         let shortUrl = ''
 
         while (num > 0) {
             const remainder = num % this.base;
             shortUrl = shortUrl + this.alphabet.charAt(remainder);
             num = Math.floor(num / this.base)
         }

        // TODO: Add the prefix baseUrl here
        return shortUrl;
    }

    async decodeURI(uri: string) {
        let id = 0;
        
        uri.split('').forEach(char => {
            id = id * this.base + this.alphabet.indexOf(char);
        })

        const entity = await this.findById(id);

        if (!!entity) {
            // Send this to a queue to save it.
            entity.handleAccess()
            this.shortnerRepository.save(entity)
            return entity.url
        } else {
            return null   
        }
    }

    async findMostVisitedLinks(): Promise<string[]> {
        return (await this.shortnerRepository.find({ order: { accesses: 'DESC' }, take: 100 }))
            .map(entity => this.parser(entity))
    }

    private parser(entity: Shortener): string {
        return `${entity.title} - ${entity.url}`
    }
}
