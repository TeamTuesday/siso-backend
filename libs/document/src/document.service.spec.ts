import { ConfigService } from '@config/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';

const mockConfigService = () => ({
  swaggerPath: '/api-docs',
});

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        DocumentService,
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
