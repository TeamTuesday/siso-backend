import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoteSubject } from './entities/vote-subject.entity';
import { VoteSubjectsService } from './vote-subjects.service';

const getMockVoteSubjectRepository = () => {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    increment: jest.fn(),
  };
};

describe('VoteSubjectsService', () => {
  let service: VoteSubjectsService;
  let voteSubjectRepository: Partial<
    Record<keyof Repository<VoteSubject>, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteSubjectsService,
        {
          provide: getRepositoryToken(VoteSubject),
          useValue: getMockVoteSubjectRepository(),
        },
      ],
    }).compile();

    service = module.get<VoteSubjectsService>(VoteSubjectsService);
    voteSubjectRepository = module.get<
      Record<keyof Repository<VoteSubject>, jest.Mock>
    >(getRepositoryToken(VoteSubject));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(voteSubjectRepository).toBeDefined();
    // expect(voteSubjectRepository.find).toBeCalled();
    // expect(voteSubjectRepository.findOne).toBeCalled();
    // expect(voteSubjectRepository.increment).toBeCalled();
  });
});
