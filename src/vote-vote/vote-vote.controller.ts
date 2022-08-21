import {Controller, NotFoundException, Param, Post} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {VoteVoteService} from "./vote-vote.service";
import {VoteSubjectsService} from "../vote-subjects/vote-subjects.service";

@Controller('vote-vote')
@ApiTags('투표 하기 API')
export class VoteVoteController {
    constructor(
        private readonly VoteVoteService: VoteVoteService,
        private readonly VoteSubjectsService: VoteSubjectsService
    ) {}

    @Post(':id')
    @ApiOperation({
        summary: '투표 하기',
        description: '특정 ID에 대한 투표 주제에 투표한다.',
    })
    async voteById(@Param('id') id: string) {
        const userId = 'TEST_02' // TODO: 임시 userId 사용
        const type = 'AGREE' // TODO: 임시 type 사용

        const voteSubject = await this.VoteSubjectsService.findById(id);
        if (!voteSubject) {
            throw new NotFoundException(`Not found vote-subject by id "${id}"`);
        }

        const voteVote = await this.VoteVoteService.findById(id, userId);
        if (voteVote) {
            throw new NotFoundException(`Already exist vote-vote by id "${id}"`);
        }

        const vote = await this.VoteVoteService.vote(voteSubject.id, type, userId);

        return {
            vote,
        };
    }
}
