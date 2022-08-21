import { Test, TestingModule } from '@nestjs/testing';
import { VoteVoteController } from './vote-vote.controller';
import { VoteVoteService } from './vote-vote.service';

describe('VoteVoteController', () => {
    let controller: VoteVoteController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VoteVoteController],
            providers: [VoteVoteService],
        }).compile();

        controller = module.get<VoteVoteController>(VoteVoteController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
