/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializingACMAdb1711654074966 implements MigrationInterface {
  name = 'InitializingACMAdb1711654074966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_id" uuid, "permission_id" uuid, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP, "created_by" uuid, "user_id" uuid, "role_id" uuid, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying(50) NOT NULL, "last_name" character varying NOT NULL, "second_last_name" character varying(50), "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(80) NOT NULL, "active" character varying NOT NULL DEFAULT true, "old_passwords" character varying array, "recovery_code" integer, "verified" boolean NOT NULL DEFAULT false, "active_role" jsonb, "refresh_token" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_modules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP, "created_by" uuid, "user_id" uuid, "module_id" uuid, CONSTRAINT "PK_01ede6942013a660f81c456031e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "modules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying(25) NOT NULL, "componentName" character varying(25) NOT NULL, "description" character varying(50) NOT NULL, "icon" character varying(50), "path" character varying(25) NOT NULL, CONSTRAINT "UQ_8cd1abde4b70e59644c98668c06" UNIQUE ("name"), CONSTRAINT "UQ_4838a66f0e1dabd39dd9d5d138b" UNIQUE ("path"), CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_modules" ADD CONSTRAINT "FK_5842b0e6bae3cf2f28d36f5b35f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_modules" ADD CONSTRAINT "FK_8d557af52554a188e079b198e98" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_modules" DROP CONSTRAINT "FK_8d557af52554a188e079b198e98"`);
    await queryRunner.query(`ALTER TABLE "user_modules" DROP CONSTRAINT "FK_5842b0e6bae3cf2f28d36f5b35f"`);
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "modules"`);
    await queryRunner.query(`DROP TABLE "user_modules"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}
