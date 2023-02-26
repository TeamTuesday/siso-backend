import { ApiProperty } from '@nestjs/swagger';

class CommentDto {
  @ApiProperty({ description: '댓글 uuid' })
  id!: string;
  @ApiProperty({ description: '댓글 생성 날짜' })
  createdAt!: Date;
  @ApiProperty({ description: '댓글 수정 날짜', nullable: true })
  updateAt!: Date;
  @ApiProperty({ description: '댓글 삭제 날짜' })
  deleteAt?: Date;
  @ApiProperty({ description: '유저 id' })
  userId!: string;
  @ApiProperty({ description: '부모 댓글 id', nullable: true })
  parentId!: string;
  @ApiProperty({ description: '찬성/반대 타입' })
  voteType!: 'AGREE' | 'DISAGREE';
  @ApiProperty({ description: '댓글(200자 이내)' })
  comment!: string;
  @ApiProperty({ description: '좋아요 수' })
  likeCount!: number;
}

class BestCommentsResponseDto {
  @ApiProperty({ description: 'A에 대한 베스트 댓글', required: false })
  commentA?: CommentDto;
  @ApiProperty({ description: 'B에 대한 베스트 댓글', required: false })
  commentB?: CommentDto;
}

export class BestCommentsSuccessDto {
  @ApiProperty({ type: BestCommentsResponseDto })
  comments?: BestCommentsResponseDto;
}
