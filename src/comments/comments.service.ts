import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Repository } from 'typeorm';

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
      },
      order: {
        likeCount: 'DESC',
      },
    });

    const commentB = await this.repository.findOne({
      where: {
        select: 'DISAGREE',
        voteSubject: voteSubjectId,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    return { commentA, commentB };
  }
}
