import { ConfigModule } from '@config/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSubject } from './entities/vote-subject.entity';
import { VoteSubjectsController } from './vote-subjects.controller';
import { VoteSubjectsService } from './vote-subjects.service';

describe('VoteSubjectsController', () => {
  let controller: VoteSubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, TypeOrmModule.forFeature([VoteSubject])],
      controllers: [VoteSubjectsController],
      providers: [VoteSubjectsService],
    }).compile();

    controller = module.get<VoteSubjectsController>(VoteSubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
