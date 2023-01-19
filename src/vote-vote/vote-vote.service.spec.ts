import { ConfigModule } from '@config/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubjectsModule } from '../vote-subjects/vote-subjects.module';
import { VoteVote } from './entities/vote-vote.entity';
import { VoteVoteService } from './vote-vote.service';

describe('VoteVoteService', () => {
  let service: VoteVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([VoteVote]),
        VoteSubjectsModule,
      ],
      providers: [VoteVoteService],
    }).compile();

    service = module.get<VoteVoteService>(VoteVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
