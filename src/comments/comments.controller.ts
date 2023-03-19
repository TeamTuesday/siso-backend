import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { VoteSubjectsService } from '../vote-subjects/vote-subjects.service';
import {
  BestCommentsSuccessDto,
  CommentDto,
  CommentsSuccessDto,
  CreateCommentDto,
  UpdateCommentDto,
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
  @ApiQuery({
    name: 'page',
    required: false,
    description: '요청 페이지 default = 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '요청 카운트 default = 10',
  })
  @ApiResponse({
    type: CommentsSuccessDto,
    description: 'success',
    status: 200,
  })
  async findComments(
    @Param('voteSubjectId', new ParseUUIDPipe()) voteSubjectId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;

    const voteSubject = await this.voteSubjectsService.findById(voteSubjectId);
    if (!voteSubject) {
      throw new NotFoundException(
        `Not found vote-subject by id "${voteSubjectId}"`,
      );
    }

    return await this.commentsService.getComments(voteSubjectId, {
      page,
      limit,
    });
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
  @ApiQuery({
    name: 'page',
    required: false,
    description: '요청 페이지 default = 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '요청 카운트 default = 10',
  })
  @ApiResponse({
    type: CommentsSuccessDto,
    description: 'success',
    status: 200,
  })
  async findChildComments(
    @Param('voteSubjectId', new ParseUUIDPipe()) voteSubjectId: string,
    @Param('parentId', new ParseUUIDPipe()) parentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;

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

    return await this.commentsService.findChildComments(
      voteSubjectId,
      parentId,
      {
        page,
        limit,
      },
    );
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
  async createComment(@Body() createCommentDto: CreateCommentDto) {
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

    const registerResult = await this.commentsService.createComment(
      voteSubject,
      userId,
      voteType,
      comment,
      parentId,
    );

    return { comment: registerResult };
  }

  @Patch()
  @ApiOperation({
    summary: '댓글 수정',
    description: '댓글을 수정한다.',
    requestBody: { $ref: getSchemaPath(UpdateCommentDto) },
  })
  @ApiResponse({
    type: CommentDto,
    description: 'success',
    status: 200,
  })
  async updateCommentById(@Body() updateCommentDto: UpdateCommentDto) {
    const { id } = updateCommentDto;
    const userId = 'TEST_02'; // FIXME: 임시 userId 사용
    // TODO 수정 가능/불가능 유저 확인

    const comment = await this.commentsService.findById(id);
    if (!comment) {
      throw new NotFoundException(`Not found comment by id "${id}"`);
    }

    const result = await this.commentsService.updateComment(
      id,
      updateCommentDto.comment,
    );

    return { comment: result };
  }
}
