import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { VoteType } from '../enums/vote-type';

export class CreateVoteDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly subjectId!: string;

  @IsEnum(VoteType)
  @IsNotEmpty()
  @ApiProperty({ enum: VoteType })
  readonly type!: VoteType;
}
