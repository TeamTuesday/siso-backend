import { ConfigModule } from '@config/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubjectsModule } from '../vote-subjects/vote-subjects.module';
import { VoteVote } from './entities/vote-vote.entity';
import { VoteVoteController } from './vote-vote.controller';
import { VoteVoteService } from './vote-vote.service';

describe('VoteVoteController', () => {
  let controller: VoteVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([VoteVote]),
        VoteSubjectsModule,
      ],
      controllers: [VoteVoteController],
      providers: [VoteVoteService],
    }).compile();

    controller = module.get<VoteVoteController>(VoteVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
