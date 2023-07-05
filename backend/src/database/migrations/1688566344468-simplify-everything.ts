import { MigrationInterface, QueryRunner } from 'typeorm';

export class SimplifyEverything1688566344468 implements MigrationInterface {
  name = 'SimplifyEverything1688566344468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "listing" DROP CONSTRAINT "FK_256d873dbdeb71430e9ed22c1b2"`
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "ownerId"`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "username" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "email" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "ownerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_256d873dbdeb71430e9ed22c1b2" FOREIGN KEY ("ownerId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
