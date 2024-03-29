import { ConfigModule } from '@config/config';
import { DocumentModule } from '@app/document';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteSubjectsModule } from './vote-subjects/vote-subjects.module';
import { VoteVoteModule } from './vote-vote/vote-vote.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule,
    DocumentModule,
    VoteSubjectsModule,
    VoteVoteModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
