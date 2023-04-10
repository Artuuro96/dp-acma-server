import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToModuleEntity1681069914761 implements MigrationInterface {
    name = 'AddColumnToModuleEntity1681069914761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" RENAME COLUMN "text" TO "componentName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" RENAME COLUMN "componentName" TO "text"`);
    }

}
