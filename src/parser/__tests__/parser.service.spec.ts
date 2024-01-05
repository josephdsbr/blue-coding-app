import { Test, TestingModule } from '@nestjs/testing';
import { ParserService } from '../parser.service';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';

describe('ParserService', () => {
  let service: ParserService;
  const mockBullQueue: any = {
    add: jest.fn(),
    process: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParserService,
        { 
          provide: getQueueToken('parser'),
          useValue: mockBullQueue
        }
      ],
    }).compile();

    service = module.get<ParserService>(ParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send to queue', () => {
    const payload = { className: 'hello', content: '<div class="hello"></div>' }
    const addToQueue = jest.spyOn(mockBullQueue, 'add');
    service.process(payload.content, payload.className);
    expect(addToQueue).toHaveBeenCalledWith('file', { file: payload.content, className: payload.className });
  })
});
