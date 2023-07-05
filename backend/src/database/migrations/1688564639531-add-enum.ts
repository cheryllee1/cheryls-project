import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnum1688564639531 implements MigrationInterface {
  name = 'AddEnum1688564639531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "categoryId" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "listing_description" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "wishlist_description" character varying NOT NULL`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."listing_condition_enum" AS ENUM('BrandNew', 'LikeNew', 'SlightlyUsed', 'WellUsed')`
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "condition" "public"."listing_condition_enum" NOT NULL DEFAULT 'BrandNew'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "condition"`);
    await queryRunner.query(`DROP TYPE "public"."listing_condition_enum"`);
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "wishlist_description"`
    );
    await queryRunner.query(
      `ALTER TABLE "listing" DROP COLUMN "listing_description"`
    );
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "description" character varying NOT NULL`
    );
  }
}
