import { hash } from 'bcrypt';
import { ConfigService } from 'src/config/config.service';
import { User } from 'src/repository/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class InitializingACMADB1676751799912 implements MigrationInterface {
  name = 'InitializingACMADB1676751799912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "REL_085d540d9f418cfbdc7bd55bb1" UNIQUE ("user_id"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying(50) NOT NULL, "last_name" character varying NOT NULL, "second_last_name" character varying(50), "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(80) NOT NULL, "active" character varying NOT NULL DEFAULT true, "old_passwords" character varying array, "recovery_code" integer, "verified" boolean NOT NULL DEFAULT false, "refresh_token" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "modules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "created_by" uuid NOT NULL, "updated_at" TIMESTAMP, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "deleted" boolean NOT NULL DEFAULT false, "name" character varying(25) NOT NULL, "text" character varying(25) NOT NULL, "description" character varying(50) NOT NULL, "path" character varying(25) NOT NULL, CONSTRAINT "UQ_8cd1abde4b70e59644c98668c06" UNIQUE ("name"), CONSTRAINT "UQ_4838a66f0e1dabd39dd9d5d138b" UNIQUE ("path"), CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY ("role_id", "permission_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") `);
    await queryRunner.query(
      `CREATE TABLE "user_modules" ("user_id" uuid NOT NULL, "module_id" uuid NOT NULL, CONSTRAINT "PK_8b466d704ba8ac7b9f6f053460a" PRIMARY KEY ("user_id", "module_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5842b0e6bae3cf2f28d36f5b35" ON "user_modules" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_8d557af52554a188e079b198e9" ON "user_modules" ("module_id") `);
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_modules" ADD CONSTRAINT "FK_5842b0e6bae3cf2f28d36f5b35f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_modules" ADD CONSTRAINT "FK_8d557af52554a188e079b198e98" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    const config = new ConfigService();
    const superUser = new User({
      email: config.get('EMAIL'),
      name: 'super user',
      lastName: 'acma',
      username: config.get('USERNAME'),
      password: await hash(config.get('PASSWORD'), Number(config.get('SALT'))),
      createdBy: uuidv4(),
      createdAt: new Date(),
    });

    await queryRunner.manager.save(superUser);
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
    await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8d557af52554a188e079b198e9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5842b0e6bae3cf2f28d36f5b35"`);
    await queryRunner.query(`DROP TABLE "user_modules"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`);
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "modules"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
}
