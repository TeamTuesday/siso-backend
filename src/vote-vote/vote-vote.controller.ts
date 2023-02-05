import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { VoteVoteService } from './vote-vote.service';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';
import { CreateVoteDto } from './dtos/create-vote.dto';

@Controller('vote-vote')
@ApiTags('투표 하기 API')
export class VoteVoteController {
  constructor(
    private readonly voteVoteService: VoteVoteService,
    private readonly voteSubjectsService: VoteSubjectsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '투표 하기',
    description: '특정 ID에 대한 투표 주제에 투표한다.',
    requestBody: { $ref: getSchemaPath(CreateVoteDto) },
  })
  async voteById(@Body() createVoteDto: CreateVoteDto) {
    console.log(createVoteDto);
    const { subjectId, type } = createVoteDto;
    const userId = 'TEST_02'; // FIXME: 임시 userId 사용

    const voteSubject = await this.voteSubjectsService.findById(subjectId);
    if (!voteSubject) {
      throw new NotFoundException(
        `Not found vote-subject by id "${subjectId}"`,
      );
    }

    const voteVote = await this.voteVoteService.findById(subjectId, userId);
    if (voteVote) {
      throw new ConflictException(
        `Already exist vote-vote by id "${subjectId}"`,
      );
    }

    const vote = await this.voteVoteService.vote(voteSubject.id, type, userId);

    return {
      vote,
    };
  }

  @Post('/reset')
  @ApiOperation({
    summary: '투표 데이터 리셋',
  })
  async reset() {
    await this.voteVoteService.reset();
  }
}
