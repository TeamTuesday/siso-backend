import {MigrationInterface, QueryRunner} from "typeorm";

export class Comment1676169142386 implements MigrationInterface {
    name = 'Comment1676169142386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" character varying NOT NULL, "parent_id" character varying, "vote_type" character varying NOT NULL, "comment" character varying(200) NOT NULL, "like_count" integer NOT NULL DEFAULT '0', "vote_subject_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_02f32163c67f4cf963403391b3d" FOREIGN KEY ("vote_subject_id") REFERENCES "vote_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_02f32163c67f4cf963403391b3d"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
