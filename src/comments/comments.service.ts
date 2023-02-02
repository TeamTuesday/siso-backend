import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Repository } from 'typeorm';
import { VoteSubject } from '../vote-subjects/entities/vote-subject.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private repository: Repository<Comments>,
  ) {}

  async findBestComments(voteSubjectId: string) {
    const commentA = await this.repository.findOne({
      where: {
        select: 'AGREE',
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    const commentB = await this.repository.findOne({
      where: {
        select: 'DISAGREE',
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    return { commentA, commentB };
  }

  async commentRegister(
    voteSubject: VoteSubject,
    userId: string,
    voteType: string,
    comment: string,
  ) {
    return await this.repository.save({
      voteSubject,
      userId,
      voteType,
      comment,
    });
  }
}
