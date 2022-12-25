import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubject } from './entities/vote-subject.entity';
import { VoteSubjectsService } from './vote-subjects.service';
import { VoteSubjectsController } from './vote-subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VoteSubject])],
  controllers: [VoteSubjectsController],
  providers: [VoteSubjectsService],
  exports: [VoteSubjectsService],
})
export class VoteSubjectsModule {}
