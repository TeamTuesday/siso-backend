import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteVote } from './entities/vote-vote.entity';
import { In, Repository } from 'typeorm';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';
import { VoteType } from 'src/vote-vote/enums/vote-type';

@Injectable()
export class VoteVoteService {
  constructor(
    @InjectRepository(VoteVote)
    private voteVoteRepository: Repository<VoteVote>,
    @Inject(forwardRef(() => VoteSubjectsService))
    private voteSubjectService: VoteSubjectsService,
  ) {}

  async vote(
    subjectId: string,
    type: VoteType,
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

  async findBySubjectsAndUser(params: ExistsParams): Promise<VoteVote[]> {
    const { subjects, user } = params;

    const votes = await this.voteVoteRepository.find({
      where: {
        subjectId: In(subjects.map(({ id }) => id)),
        userId: user.id,
      },
    });

    return votes;
  }

  async reset() {
    await this.voteVoteRepository.delete({});
  }
}

type ExistsParams = {
  subjects: { id: string }[];
  user: { id: string };
};
