import { Body, Controller, Post } from '@nestjs/common';
import { ParserService } from './parser.service';

@Controller('parser')
export class ParserController {
    constructor(private parserService: ParserService) {}

    @Post()
    processFile(
        @Body() data: { content: string, className: string }
    ) {
        this.parserService.process(data.content, data.className)
    }
    
}
