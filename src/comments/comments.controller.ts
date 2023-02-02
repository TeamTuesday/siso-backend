import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';

@Controller('comments')
@ApiTags('댓글 API')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly voteSubjectsService: VoteSubjectsService,
  ) {}

  @Get('/best/:id')
  @ApiOperation({
    summary: '대표 의견 조회',
    description: '주제에 대한 대표 의견(베스트 댓글)을 조회한다.',
  })
  async findBestComments(@Param('id', new ParseUUIDPipe()) id: string) {
    const comments = await this.commentsService.findBestComments(id);

    return { comments };
  }

  @Post()
  @ApiExcludeEndpoint()
  async commentRegister(
    @Body('subjectId') subjectId: string,
    @Body('voteType') voteType: string,
    @Body('comment') comment: string,
  ) {
    const userId = 'TEST_02'; // FIXME: 임시 userId 사용

    const voteSubject = await this.voteSubjectsService.findById(subjectId);
    if (!voteSubject) {
      throw new NotFoundException(
        `Not found vote-subject by id "${subjectId}"`,
      );
    }

    const result = await this.commentsService.commentRegister(
      voteSubject,
      userId,
      voteType,
      comment,
    );

    return { result };
  }
}
