import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { load, CheerioAPI } from 'cheerio'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/parse')
  getParse(): CheerioAPI {
    const markup = `<ul id="js-frameworks">
                    <li class="vue">Vue.js ⚡</li>
                    <li class="react">React</li>
                    <li class="svelte">Svelte</li>
                    <li class="angular">Angular</li>
                </ul>`;
    return load(markup)
  }
}
