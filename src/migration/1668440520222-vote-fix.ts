import { MigrationInterface, QueryRunner } from 'typeorm';

export class voteFix1668440520222 implements MigrationInterface {
  name = 'voteFix1668440520222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vote_subject" DROP COLUMN "created"`);
    await queryRunner.query(`ALTER TABLE "vote_subject" DROP COLUMN "updated"`);
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" DROP CONSTRAINT "PK_60e49669dd8faade62008761421"`,
    );
    await queryRunner.query(`ALTER TABLE "vote_subject" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD CONSTRAINT "PK_60e49669dd8faade62008761421" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vote_subject" DROP CONSTRAINT "PK_60e49669dd8faade62008761421"`,
    );
    await queryRunner.query(`ALTER TABLE "vote_subject" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD CONSTRAINT "PK_60e49669dd8faade62008761421" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "updated" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "vote_subject" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
