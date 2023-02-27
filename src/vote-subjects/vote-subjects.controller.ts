import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VoteSubjectsService } from './vote-subjects.service';
import { VoteSubjectsDto } from './dto/vote-subjects.dto';

@Controller('vote-subjects')
@ApiTags('투표 주제 API')
export class VoteSubjectsController {
  constructor(private readonly voteSubjectService: VoteSubjectsService) {}

  @Get()
  @ApiOperation({
    summary: '투표 주제 목록 조회',
    description: '투표 주제를 목록 형태로 조회한다.',
  })
  @ApiResponse({
    type: VoteSubjectsDto,
    isArray: true,
    description: 'success',
    status: 200,
  })
  async findAll() {
    const voteSubjects = await this.voteSubjectService.findAll();

    return {
      voteSubjects,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '투표 주제 조회',
    description: '특정 ID에 대한 투표 주제를 조회한다.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '투표 주제 uuid',
  })
  @ApiResponse({
    type: VoteSubjectsDto,
    description: 'success',
    status: 200,
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const voteSubject = await this.voteSubjectService.findById(id);
    if (!voteSubject) {
      throw new NotFoundException(`Not found vote-subject by id "${id}"`);
    }

    return {
      voteSubject,
    };
  }
}
