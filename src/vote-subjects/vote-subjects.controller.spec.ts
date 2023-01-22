import { Test, TestingModule } from '@nestjs/testing';
import { VoteSubjectsController } from './vote-subjects.controller';
import { VoteSubjectsService } from './vote-subjects.service';

const getMockVoteSubjectsService = () => {
  return {
    findById: jest.fn(),
  };
};

describe('VoteSubjectsController', () => {
  let controller: VoteSubjectsController;
  let voteSubjectsService: Partial<
    Record<keyof VoteSubjectsService, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteSubjectsController],
      providers: [
        VoteSubjectsService,
        {
          provide: VoteSubjectsService,
          useValue: getMockVoteSubjectsService(),
        },
      ],
    }).compile();

    controller = module.get<VoteSubjectsController>(VoteSubjectsController);
    voteSubjectsService = module.get(VoteSubjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(voteSubjectsService).toBeDefined();
  });
});
