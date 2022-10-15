import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteVote } from './entities/vote-vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoteVoteService {
  constructor(
    @InjectRepository(VoteVote)
    private voteVoteRepository: Repository<VoteVote>,
  ) {
    this.voteVoteRepository = voteVoteRepository;
  }

  async vote(
    voteId: string,
    type: string,
    userId: string,
  ): Promise<VoteVote | undefined> {
    const vote = await this.voteVoteRepository.save({
      voteId,
      type,
      userId,
    });
    return vote;
  }

  async findById(id: string, userId: string) {
    return (
      (await this.voteVoteRepository.findOne({ voteId: id, userId })) ?? null
    );
  }
}
