import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAuditFieldsToInterTables1681082627103 implements MigrationInterface {
    name = 'AddedAuditFieldsToInterTables1681082627103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_modules" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_modules" ADD "created_by" uuid`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "created_by" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_modules" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "user_modules" DROP COLUMN "created_at"`);
    }

}
