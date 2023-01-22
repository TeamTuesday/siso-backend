import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';
import { Repository } from 'typeorm';
import { VoteVote } from './entities/vote-vote.entity';
import { VoteVoteService } from './vote-vote.service';

const getMockVoteVoteRepository = () => {
  return {
    save: jest.fn(),
    findOne: jest.fn(),
  };
};

const getMockVoteSubjectsService = () => {
  return {
    increaseVoteCount: jest.fn(),
  };
};

describe('VoteVoteService', () => {
  let service: VoteVoteService;
  let voteVoteRepository: Partial<
    Record<keyof Repository<VoteVote>, jest.Mock>
  >;
  let voteSubjectsService: Partial<
    Record<keyof VoteSubjectsService, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteVoteService,
        {
          provide: VoteSubjectsService,
          useValue: getMockVoteSubjectsService(),
        },
        {
          provide: getRepositoryToken(VoteVote),
          useValue: getMockVoteVoteRepository(),
        },
      ],
    }).compile();

    service = module.get<VoteVoteService>(VoteVoteService);
    voteVoteRepository = module.get(getRepositoryToken(VoteVote));
    voteSubjectsService = module.get(VoteSubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(voteVoteRepository).toBeDefined();
    expect(voteSubjectsService).toBeDefined();
  });
});
