import { MigrationInterface, QueryRunner } from 'typeorm';

export class voteVote1658670131502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "vote_vote" (
                "id" SERIAL NOT NULL,
                "voteId" character varying(50) NOT NULL,
                "type" character varying(20) NOT NULL,
                "userId" character varying(20) NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "updated" TIMESTAMP DEFAULT now(),
                "deleted" TIMESTAMP,
                CONSTRAINT "PK_60e49669dd8faade62008761422" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vote_vote"`);
  }
}
