import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1746948000579 implements MigrationInterface {
    name = 'Tables1746948000579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maximum_quantity" DROP COLUMN "extra"`);
        await queryRunner.query(`ALTER TABLE "maximum_quantity" ADD "extra" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maximum_quantity" DROP COLUMN "extra"`);
        await queryRunner.query(`ALTER TABLE "maximum_quantity" ADD "extra" integer NOT NULL DEFAULT '0'`);
    }

}
