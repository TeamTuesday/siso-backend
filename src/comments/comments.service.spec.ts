import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comments.entity';

const getMockCommentsRepository = () => {
  return {
    findBestComments: jest.fn(),
    commentRegister: jest.fn(),
  };
};

describe('CommentsService', () => {
  let service: CommentsService;
  let commentsRepository: Partial<Record<keyof Repository<Comment>, jest.Mock>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: getMockCommentsRepository(),
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<
      Record<keyof Repository<Comment>, jest.Mock>
    >(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service).toBeDefined();
  });
});
