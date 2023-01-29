import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('댓글 API')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/best/:id')
  @ApiOperation({
    summary: '대표 의견 조회',
    description: '주제에 대한 대표 의견(베스트 댓글)을 조회한다.',
  })
  async findBestComments(@Param('id', new ParseUUIDPipe()) id: string) {
    const comments = await this.commentsService.findBestComments(id);

    return { comments };
  }
}
