import { Test, TestingModule } from '@nestjs/testing';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';
import { VoteVoteController } from './vote-vote.controller';
import { VoteVoteService } from './vote-vote.service';

const getMockVoteVoteService = () => {
  return {
    findById: jest.fn(),
    vote: jest.fn(),
  };
};

const getMockVoteSubjectsService = () => {
  return {
    findById: jest.fn(),
  };
};

describe('VoteVoteController', () => {
  let controller: VoteVoteController;
  let voteVoteService: Partial<Record<keyof VoteVoteService, jest.Mock>>;
  let voteSubjectsService: Partial<
    Record<keyof VoteSubjectsService, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteVoteController],
      providers: [
        VoteVoteService,
        {
          provide: VoteVoteService,
          useValue: getMockVoteVoteService(),
        },
        {
          provide: VoteSubjectsService,
          useValue: getMockVoteSubjectsService(),
        },
      ],
    }).compile();

    controller = module.get<VoteVoteController>(VoteVoteController);
    voteVoteService = module.get(VoteVoteService);
    voteSubjectsService = module.get(VoteSubjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(voteVoteService).toBeDefined();
    expect(voteSubjectsService).toBeDefined();
  });
});
