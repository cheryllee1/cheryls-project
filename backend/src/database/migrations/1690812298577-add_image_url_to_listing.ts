import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUrlToListing1690812298577 implements MigrationInterface {
    name = 'AddImageUrlToListing1690812298577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" ADD "image_url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "image_url"`);
    }

}
