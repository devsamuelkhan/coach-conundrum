import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesAndMasterData1638792764313 implements MigrationInterface {
  name = 'AddTablesAndMasterData1638792764313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'user' schema and 'user' table
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS "user";
      CREATE TABLE IF NOT EXISTS "user"."user" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "email" VARCHAR NOT NULL UNIQUE,
        "role" VARCHAR NOT NULL,
        "phone_number" VARCHAR NOT NULL
      );
    `);

    // Create the 'slot' schema and 'slot' table
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS "slot";
      CREATE TABLE IF NOT EXISTS "slot"."slot" (
        "id" SERIAL PRIMARY KEY,
        "start_time" TIMESTAMP NOT NULL,
        "coach_id" INT NOT NULL,
        "student_id" INT,
        "call" BOOLEAN DEFAULT FALSE,
        "satisfaction" FLOAT,
        "notes" TEXT,
        FOREIGN KEY ("coach_id") REFERENCES "user"."user"("id") ON DELETE CASCADE,
        FOREIGN KEY ("student_id") REFERENCES "user"."user"("id") ON DELETE SET NULL
      );
    `);

    // Insert two dummy users (coaches and students)
    await queryRunner.query(`
      INSERT INTO "user"."user" ("name", "email", "role", "phone_number") VALUES
      ('Coach One', 'coach1@example.com', 'coach', '1234567890'),
      ('Coach Two', 'coach2@example.com', 'coach', '0987654321'),
      ('Student One', 'student1@example.com', 'student', '1122334455'),
      ('Student Two', 'student2@example.com', 'student', '5566778899');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback the inserted dummy data if needed
    await queryRunner.query(`
      DELETE FROM "user"."user" WHERE "email" IN ('coach1@example.com', 'coach2@example.com', 'student1@example.com', 'student2@example.com');
    `);

    // Drop the 'slot' table and 'slot' schema
    await queryRunner.query(`
      DROP TABLE IF EXISTS "slot"."slot";
      DROP SCHEMA IF EXISTS "slot" CASCADE;
    `);

    // Drop the 'user' table and 'user' schema
    await queryRunner.query(`
      DROP TABLE IF EXISTS "user"."user";
      DROP SCHEMA IF EXISTS "user" CASCADE;
    `);
  }
}
