import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameColumnOppositeToDisagree1674127432964
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'vote_subject',
      'opposite_description',
      'disagree_description',
    );
    await queryRunner.renameColumn(
      'vote_subject',
      'vote_opposite_count',
      'vote_disagree_count',
    );
    await queryRunner.query(
      `UPDATE vote_vote SET type = 'DISAGREE' WHERE type = 'OPPOSITE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'vote_subject',
      'disagree_description',
      'opposite_description',
    );
    await queryRunner.renameColumn(
      'vote_subject',
      'vote_disagree_count',
      'vote_opposite_count',
    );
    await queryRunner.query(
      `UPDATE vote_vote SET type = 'OPPOSITE' WHERE type = 'DISAGREE'`,
    );
  }
}
