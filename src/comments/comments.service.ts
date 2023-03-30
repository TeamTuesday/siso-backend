import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';
import { Repository } from 'typeorm';
import { VoteSubject } from '../vote-subjects/entities/vote-subject.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
  ) {}

  async findById(id: string, withDeleted = false) {
    const result = await this.repository.findOne(id, { withDeleted });
    return result ?? null;
  }

  async findBestComments(voteSubjectId: string) {
    const commentA = await this.repository.findOne({
      where: {
        voteType: 'AGREE',
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    const commentB = await this.repository.findOne({
      where: {
        voteType: 'DISAGREE',
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    return { commentA, commentB };
  }

  async getComments(
    voteSubjectId: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Comment>> {
    return paginate<Comment>(this.repository, options, {
      where: {
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findChildComments(
    voteSubjectId: string,
    parentId: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Comment>> {
    return paginate<Comment>(this.repository, options, {
      where: {
        voteSubject: voteSubjectId,
        parentId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async createComment(
    subject: VoteSubject,
    userId: string,
    voteType: string,
    comment: string,
    parentId?: string,
  ) {
    const result = await this.repository.save({
      voteSubject: subject,
      userId,
      voteType,
      comment,
      parentId,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { voteSubject, ...commentResult } = result;

    return commentResult;
  }

  async updateComment(id: string, comment: string) {
    await this.repository.update(id, {
      comment,
    });

    return this.findById(id);
  }

  async deleteComment(id: string) {
    await this.repository.softDelete(id);

    return this.findById(id, true);
  }
}
