import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteVote } from './entities/vote-vote.entity';
import { VoteVoteService } from './vote-vote.service';
import { VoteVoteController } from './vote-vote.controller';
import { VoteSubjectsModule } from 'src/vote-subjects/vote-subjects.module';

@Module({
  imports: [TypeOrmModule.forFeature([VoteVote]), VoteSubjectsModule],
  controllers: [VoteVoteController],
  providers: [VoteVoteService],
})
export class VoteVoteModule {}
