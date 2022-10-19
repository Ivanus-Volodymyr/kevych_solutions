import { MigrationInterface, QueryRunner } from "typeorm";

export class Trains1666115675676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Trains (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(250) NOT NULL,
                description VARCHAR(250) NOT NULL,
                route VARCHAR(250) NOT NULL,
                arrival_time INT(250) NOT NULL DEFAULT(0),
                departure_time INT(250) NOT NULL DEFAULT(0),
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS Users
        `);
  }
}
