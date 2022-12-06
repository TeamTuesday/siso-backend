import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteVote } from './entities/vote-vote.entity';
import { Repository } from 'typeorm';
import { VoteSubject } from '../vote-subjects/entities/vote-subject.entity';

@Injectable()
export class VoteVoteService {
  constructor(
    @InjectRepository(VoteVote)
    private voteVoteRepository: Repository<VoteVote>,
    @InjectRepository(VoteSubject)
    private voteSubjectRepository: Repository<VoteSubject>,
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
    await this.voteSubjectRepository.increment(
      { id: subjectId },
      type === 'AGREE' ? 'voteAgreeCount' : 'voteOppositeCount',
      1,
    );
    return vote;
  }

  async findById(subjectId: string, userId: string) {
    const vote = await this.voteVoteRepository.findOne({ subjectId, userId });
    return vote ?? null;
  }
}
