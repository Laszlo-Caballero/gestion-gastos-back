import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1747631721277 implements MigrationInterface {
    name = 'Tables1747631721277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "icome" ("icomeId" SERIAL NOT NULL, "source" character varying NOT NULL, "amount" double precision NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" integer, CONSTRAINT "PK_0ff0eee16ea57a6c7038cd1e4d3" PRIMARY KEY ("icomeId"))`);
        await queryRunner.query(`ALTER TABLE "icome" ADD CONSTRAINT "FK_6a1d3c5e9121b01cb7ba939f769" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "icome" DROP CONSTRAINT "FK_6a1d3c5e9121b01cb7ba939f769"`);
        await queryRunner.query(`DROP TABLE "icome"`);
    }

}
