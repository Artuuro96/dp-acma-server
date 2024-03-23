import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedActiveRoleColumnIntoUserTable1711118208215 implements MigrationInterface {
  name = 'AddedActiveRoleColumnIntoUserTable1711118208215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "active_role" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active_role"`);
  }
}
