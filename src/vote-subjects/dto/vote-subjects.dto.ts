import { ApiProperty } from '@nestjs/swagger';

export class VoteSubjectsDto {
  @ApiProperty({ description: '투표 주제 uuid' })
  id!: string;
  @ApiProperty({ description: '투표 주제 제목' })
  title!: string;
  @ApiProperty({ description: '댓글 생성 날짜' })
  createdAt!: Date;
  @ApiProperty({ description: '댓글 수정 날짜' })
  updateAt!: Date;
  @ApiProperty({ description: '댓글 삭제 날짜', nullable: true })
  deleteAt?: Date;
  @ApiProperty({ description: '찬성 의견' })
  agreeDescription!: string;
  @ApiProperty({ description: '반대 의견' })
  disagreeDescription!: string;
  @ApiProperty({ description: '찬성 투표 수' })
  voteAgreeCount!: number;
  @ApiProperty({ description: '반대 투표 수' })
  voteDisagreeCount!: number;
  @ApiProperty({ description: '전체 투표 수' })
  voteCount!: number;
  @ApiProperty({ description: '투표 여부' })
  hasVote!: boolean;
}
