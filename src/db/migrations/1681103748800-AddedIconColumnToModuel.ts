import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIconColumnToModuel1681103748800 implements MigrationInterface {
    name = 'AddedIconColumnToModuel1681103748800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" ADD "icon" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" DROP COLUMN "icon"`);
    }

}
