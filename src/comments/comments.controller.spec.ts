import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';

const getMockCommentsService = () => {
  return {
    findBestComments: jest.fn(),
    commentRegister: jest.fn(),
  };
};

const getMockVoteSubjectsService = () => {
  return {
    findById: jest.fn(),
  };
};

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: Partial<Record<keyof CommentsService, jest.Mock>>;
  let voteSubjectsService: Partial<
    Record<keyof VoteSubjectsService, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: CommentsService,
          useValue: getMockCommentsService(),
        },
        {
          provide: VoteSubjectsService,
          useValue: getMockVoteSubjectsService(),
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get(CommentsService);
    voteSubjectsService = module.get(VoteSubjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(commentsService).toBeDefined();
    expect(voteSubjectsService).toBeDefined();
  });
});
