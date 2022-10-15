import { Test, TestingModule } from '@nestjs/testing';
import { VoteVoteService } from './vote-vote.service';

describe('VoteVoteService', () => {
  let service: VoteVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteVoteService],
    }).compile();

    service = module.get<VoteVoteService>(VoteVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
