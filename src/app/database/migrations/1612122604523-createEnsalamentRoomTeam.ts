import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createEnsalamentRoomTeam1612122604523
  implements MigrationInterface {
  name = 'createEnsalamentRoomTeam1612122604523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ensalament_room_team',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'ensalament_room_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'team_id',
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
      'ensalament_room_team',
      new TableForeignKey({
        columnNames: ['ensalament_room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ensalament_room',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'ensalament_room_team',
      new TableForeignKey({
        columnNames: ['team_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ensalament_room_team');
  }
}
