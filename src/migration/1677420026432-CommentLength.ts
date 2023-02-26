import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentLength1677420026432 implements MigrationInterface {
  name = 'CommentLength1677420026432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "comment" type character varying(300)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
