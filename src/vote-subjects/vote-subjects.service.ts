import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteType } from '../vote-vote/enums/vote-type';
import { Repository } from 'typeorm';
import { VoteSubject } from './entities/vote-subject.entity';

@Injectable()
export class VoteSubjectsService {
  constructor(
    @InjectRepository(VoteSubject)
    private voteSubjectRepository: Repository<VoteSubject>,
  ) {}
  findAll(): Promise<VoteSubject[]> {
    return this.voteSubjectRepository.find();
  }

  async findById(id: string): Promise<VoteSubject | null> {
    const result = await this.voteSubjectRepository.findOne(id);
    return result ?? null;
  }

  async increaseVoteCount(id: string, type: VoteType): Promise<void> {
    await this.voteSubjectRepository.increment(
      { id },
      type === VoteType.AGREE ? 'voteAgreeCount' : 'voteDisagreeCount',
      1,
    );
    await this.voteSubjectRepository.increment({ id }, 'voteCount', 1);
  }
}
