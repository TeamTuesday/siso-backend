import { ConfigModule } from '@config/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubject } from './entities/vote-subject.entity';
import { VoteSubjectsService } from './vote-subjects.service';

describe('VoteSubjectsService', () => {
  let service: VoteSubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, TypeOrmModule.forFeature([VoteSubject])],
      providers: [VoteSubjectsService],
    }).compile();

    service = module.get<VoteSubjectsService>(VoteSubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
