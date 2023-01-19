import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteVote } from './entities/vote-vote.entity';
import { Repository } from 'typeorm';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';

@Injectable()
export class VoteVoteService {
  constructor(
    @InjectRepository(VoteVote)
    private voteVoteRepository: Repository<VoteVote>,
    private voteSubjectService: VoteSubjectsService,
  ) {}

  async vote(
    subjectId: string,
    type: string,
    userId: string,
  ): Promise<VoteVote | undefined> {
    const vote = await this.voteVoteRepository.save({
      subjectId,
      type,
      userId,
    });
    await this.voteSubjectService.increaseVoteCount(subjectId, type);
    return vote;
  }

  async findById(subjectId: string, userId: string) {
    const vote = await this.voteVoteRepository.findOne({ subjectId, userId });
    return vote ?? null;
  }
}
