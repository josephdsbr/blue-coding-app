import { Controller, Get, Param, Post } from '@nestjs/common';
import { ShortenerService } from './shortener.service';

@Controller('shortener')
export class ShortenerController {
    constructor(private shortnerService: ShortenerService) {}
    // /shortner/{uri}
    @Post('/encode/:uri')
    shortUrl(@Param('uri') uri: string) {
        return this.shortnerService.encodeURI(uri)
    }

    @Get('/decode/:uri')
    decodeUrl(@Param('uri') uri: string) {
        return this.shortnerService.decodeURI(uri)
    }

    @Get('ranking')
    findMostVisitedLinks() {
        return this.shortnerService.findMostVisitedLinks();
    }
}
