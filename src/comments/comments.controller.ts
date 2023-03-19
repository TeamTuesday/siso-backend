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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';
import {
  BestCommentsSuccessDto,
  CommentDto,
  CreateCommentDto,
} from './dto/comments.dto';

@Controller('comments')
@ApiTags('댓글 API')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly voteSubjectsService: VoteSubjectsService,
  ) {}

  @Get('/best/:voteSubjectId')
  @ApiOperation({
    summary: '베스트 댓글 조회',
    description: '주제에 대한 베스트 댓글을 조회한다.',
  })
  @ApiParam({
    name: 'voteSubjectId',
    required: true,
    description: '투표 주제 uuid',
  })
  @ApiResponse({
    type: BestCommentsSuccessDto,
    description: 'success',
    status: 200,
  })
  async findBestComments(
    @Param('voteSubjectId', new ParseUUIDPipe()) voteSubjectId: string,
  ) {
    const comments = await this.commentsService.findBestComments(voteSubjectId);

    return { comments };
  }

  @Get('/:voteSubjectId')
  @ApiOperation({
    summary: '댓글 조회',
    description: '주제에 대한 댓글을 조회한다.',
  })
  @ApiParam({
    name: 'voteSubjectId',
    required: true,
    description: '투표 주제 uuid',
  })
  @ApiResponse({
    type: [CommentDto],
    description: 'success',
    status: 200,
  })
  async getComments(
    @Param('voteSubjectId', new ParseUUIDPipe()) voteSubjectId: string,
  ) {
    const voteSubject = await this.voteSubjectsService.findById(voteSubjectId);
    if (!voteSubject) {
      throw new NotFoundException(
        `Not found vote-subject by id "${voteSubjectId}"`,
      );
    }

    const comments = await this.commentsService.getComments(voteSubjectId);

    return { comments };
  }

  @Get('/:voteSubjectId/:parentId')
  @ApiOperation({
    summary: '대댓글 조회',
    description: '대댓글을 조회한다.',
  })
  @ApiParam({
    name: 'voteSubjectId',
    required: true,
    description: '투표 주제 uuid',
  })
  @ApiParam({
    name: 'parentId',
    required: true,
    description: '댓글 uuid',
  })
  @ApiResponse({
    type: [CommentDto],
    description: 'success',
    status: 200,
  })
  async getChildComments(
    @Param('voteSubjectId', new ParseUUIDPipe()) voteSubjectId: string,
    @Param('parentId', new ParseUUIDPipe()) parentId: string,
  ) {
    const voteSubject = await this.voteSubjectsService.findById(voteSubjectId);
    if (!voteSubject) {
      throw new NotFoundException(
        `Not found vote-subject by id "${voteSubjectId}"`,
      );
    }

    if (parentId) {
      const comment = await this.commentsService.findById(parentId);
      if (!comment) {
        throw new NotFoundException(
          `Not found parent-comment by id "${parentId}"`,
        );
      }
    }

    const comments = await this.commentsService.getChildComments(
      voteSubjectId,
      parentId,
    );

    return { comments };
  }

  @Post()
  @ApiOperation({
    summary: '댓글 생성',
    description: '주제에 대한 댓글을 생성한다.',
    requestBody: { $ref: getSchemaPath(CreateCommentDto) },
  })
  @ApiCreatedResponse({
    type: CommentDto,
    description: 'success',
    status: 201,
  })
  async commentRegister(@Body() createCommentDto: CreateCommentDto) {
    const { subjectId, voteType, comment, parentId } = createCommentDto;
    const userId = 'TEST_02'; // FIXME: 임시 userId 사용

    const voteSubject = await this.voteSubjectsService.findById(subjectId);
    if (!voteSubject) {
      throw new NotFoundException(
        `Not found vote-subject by id "${subjectId}"`,
      );
    }

    if (parentId) {
      const comment = await this.commentsService.findById(parentId);
      if (!comment) {
        throw new NotFoundException(
          `Not found parent-comment by id "${parentId}"`,
        );
      }
    }

    const registerResult = await this.commentsService.commentRegister(
      voteSubject,
      userId,
      voteType,
      comment,
      parentId,
    );

    return { comment: registerResult };
  }
}
