import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createEnsalament1611182377215 implements MigrationInterface {
  name = 'createEnsalament1611182377215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ensalament',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'week_day',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'shift',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ensalament');
  }
}
