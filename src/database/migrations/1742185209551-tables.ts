import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1742185209551 implements MigrationInterface {
    name = 'Tables1742185209551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense" ("expenseId" SERIAL NOT NULL, "expenseName" character varying NOT NULL, "expenseAmount" double precision NOT NULL, "expenseDate" TIMESTAMP NOT NULL, "userUserId" integer, CONSTRAINT "PK_dbe84a016f1097c0ed5b153a720" PRIMARY KEY ("expenseId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "maximum_quantity" ("maximumQuantityId" SERIAL NOT NULL, "quantity" integer NOT NULL, "initialDate" TIMESTAMP NOT NULL DEFAULT now(), "extra" integer NOT NULL, "userUserId" integer, CONSTRAINT "PK_89f965f5be49fda81572336cc7f" PRIMARY KEY ("maximumQuantityId"))`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_5ca105dc21043020f13f610eadd" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "maximum_quantity" ADD CONSTRAINT "FK_e913ce5896d67bd357757395a50" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maximum_quantity" DROP CONSTRAINT "FK_e913ce5896d67bd357757395a50"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_5ca105dc21043020f13f610eadd"`);
        await queryRunner.query(`DROP TABLE "maximum_quantity"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "expense"`);
    }

}
