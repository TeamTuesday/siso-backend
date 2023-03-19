import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: '전체 items 수' })
  readonly totalItems!: number;

  @ApiProperty({ description: '조회된 items 수' })
  readonly itemCount!: number;

  @ApiProperty({ description: '요청된 items 수' })
  readonly itemsPerPage!: number;

  @ApiProperty({ description: '전체 page 수' })
  readonly totalPages!: number;

  @ApiProperty({ description: '현재 page' })
  readonly currentPage!: number;
}
