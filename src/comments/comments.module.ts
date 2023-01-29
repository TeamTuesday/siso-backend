import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubject } from '../vote-subjects/entities/vote-subject.entity';
import { Comments } from './entities/comments.entity';
import { VoteSubjectsModule } from '../vote-subjects/vote-subjects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteSubject, Comments]),
    VoteSubjectsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
