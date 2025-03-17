import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1742191513256 implements MigrationInterface {
    name = 'Tables1742191513256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maximum_quantity" ALTER COLUMN "extra" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maximum_quantity" ALTER COLUMN "extra" DROP DEFAULT`);
    }

}
