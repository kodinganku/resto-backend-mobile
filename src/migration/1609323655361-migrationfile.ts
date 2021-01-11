import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationfile1609323655361 implements MigrationInterface {
    name = 'migrationfile1609323655361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
