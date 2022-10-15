import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1655265681090 implements MigrationInterface {
  name = 'Test1655265681090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vote_subject" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), "agree_description" character varying NOT NULL, "opposite_description" character varying NOT NULL, "vote_agree_count" integer NOT NULL DEFAULT '0', "vote_opposite_count" integer NOT NULL DEFAULT '0', "vote_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_60e49669dd8faade62008761421" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vote_subject"`);
  }
}
