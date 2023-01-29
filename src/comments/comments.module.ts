import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubject } from '../vote-subjects/entities/vote-subject.entity';
import { Comments } from './entities/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoteSubject, Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
