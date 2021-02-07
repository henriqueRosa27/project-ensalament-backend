import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createEnsalamentRoom1612122592485 implements MigrationInterface {
  name = 'createEnsalamentRoom1612122592485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ensalament_room',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'ensalament_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'room_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'ensalament_room',
      new TableForeignKey({
        columnNames: ['ensalament_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ensalament',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'ensalament_room',
      new TableForeignKey({
        columnNames: ['room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'room',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ensalament_room');
  }
}
