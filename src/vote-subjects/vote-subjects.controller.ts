import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VoteVote } from 'src/vote-vote/entities/vote-vote.entity';
import { VoteVoteService } from '../vote-vote/vote-vote.service';
import { VoteSubjectsService } from './vote-subjects.service';
import { VoteSubjectsDto } from './dto/vote-subjects.dto';

@Controller('vote-subjects')
@ApiTags('투표 주제 API')
export class VoteSubjectsController {
  constructor(
    private readonly voteSubjectService: VoteSubjectsService,
    private readonly voteVoteService: VoteVoteService,
  ) {}

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
    const userId = 'TEST_02'; // FIXME: 임시 userId 사용
    const voteSubjects = await this.voteSubjectService.findAll();
    const voteVotes = await this.voteVoteService.findBySubjectsAndUser({
      subjects: voteSubjects,
      user: { id: userId },
    });

    const votesDict = voteVotes.reduce((dict, item) => {
      if (!dict[item.subjectId]) dict[item.subjectId] = [];
      dict[item.subjectId].push(item);
      return dict;
    }, {} as Record<VoteVote['subjectId'], VoteVote[]>);

    const voteSubjectWithVote = voteSubjects.map((subject) => ({
      ...subject,
      hasVote: !!votesDict[subject.id]?.length,
    }));

    return {
      voteSubjects: voteSubjectWithVote,
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
    const userId = 'TEST_02'; // FIXME: 임시 userId 사용
    const voteSubject = await this.voteSubjectService.findById(id);
    if (!voteSubject) {
      throw new NotFoundException(`Not found vote-subject by id "${id}"`);
    }

    const voteVotes = await this.voteVoteService.findBySubjectsAndUser({
      subjects: [voteSubject],
      user: { id: userId },
    });

    return {
      voteSubject: { ...voteSubject, hasVote: !!voteVotes.length },
    };
  }
}
