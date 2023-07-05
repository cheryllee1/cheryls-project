import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1688560871668 implements MigrationInterface {
  name = 'Initial1688560871668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."user_email_idx"`);
    await queryRunner.query(
      `CREATE TABLE "listing" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phoneNumber" character varying(255)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "socialMedia" character varying(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_256d873dbdeb71430e9ed22c1b2" FOREIGN KEY ("ownerId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_256d873dbdeb71430e9ed22c1b2"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "socialMedia"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`DROP TABLE "listing"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "user_email_idx" ON "users" ("email") WHERE ("deletedAt" IS NULL)`
    );
  }
}
