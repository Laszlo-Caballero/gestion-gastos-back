import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1742186292692 implements MigrationInterface {
    name = 'Tables1742186292692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ALTER COLUMN "expenseDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ALTER COLUMN "expenseDate" DROP DEFAULT`);
    }

}
