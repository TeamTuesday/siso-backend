import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';
import { VoteType } from '../../vote-vote/enums/vote-type';
import { PaginationDto } from '../../utils/dto/pagination.dto';

export class CommentDto {
  @ApiProperty({ description: '댓글 uuid' })
  id!: string;
  @ApiProperty({ description: '댓글 생성 날짜' })
  createdAt!: Date;
  @ApiProperty({ description: '댓글 수정 날짜' })
  updateAt!: Date;
  @ApiProperty({ description: '댓글 삭제 날짜', nullable: true })
  deleteAt?: Date;
  @ApiProperty({ description: '유저 id' })
  userId!: string;
  @ApiProperty({ description: '부모 댓글 id', nullable: true })
  parentId!: string;
  @IsEnum(VoteType)
  @ApiProperty({ description: '찬성/반대 타입' })
  voteType!: 'AGREE' | 'DISAGREE';
  @ApiProperty({ description: '댓글(300자 이내)' })
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

export class CommentsSuccessDto {
  @ApiProperty({ description: '댓글 목록', type: [CommentDto] })
  items!: [CommentDto];

  @ApiProperty()
  meta!: PaginationDto;
}

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: '투표 주제 uuid' })
  readonly subjectId!: string;

  @IsEnum(VoteType)
  @IsNotEmpty()
  @ApiProperty({ description: '찬성/반대 타입', enum: VoteType })
  readonly voteType!: VoteType;

  @IsNotEmpty()
  @Length(1, 300)
  @ApiProperty({ description: '댓글 내용' })
  readonly comment!: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: '부모 댓글 id', nullable: true })
  readonly parentId?: string;
}

export class UpdateCommentDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: '댓글 id' })
  readonly id!: string;

  @IsNotEmpty()
  @Length(1, 300)
  @ApiProperty({ description: '댓글 내용' })
  readonly comment!: string;
}
