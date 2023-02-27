import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubject } from './entities/vote-subject.entity';
import { VoteSubjectsService } from './vote-subjects.service';
import { VoteSubjectsController } from './vote-subjects.controller';
import { VoteVoteModule } from '../vote-vote/vote-vote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteSubject]),
    forwardRef(() => VoteVoteModule),
  ],
  controllers: [VoteSubjectsController],
  providers: [VoteSubjectsService],
  exports: [VoteSubjectsService],
})
export class VoteSubjectsModule {}
