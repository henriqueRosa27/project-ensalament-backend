import { ConnectionOptions } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RoleEntity } from 'src/auth/roles.entity';
import { BuildingEntity } from 'src/building/building.entity';
import { RoomEntity } from 'src/room/room.entity';
import { CourseEntity } from 'src/course/course.entity';
import { TeamEntity } from 'src/team/team.entity';
import { WorkloadEntity } from 'src/workload/workload.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456789!',
  database: 'ensalament',
  migrationsTransactionMode: 'each',

  entities: [
    RoleEntity,
    UserEntity,
    BuildingEntity,
    RoomEntity,
    CourseEntity,
    TeamEntity,
    WorkloadEntity,
  ],
  migrationsTableName: 'migrations_typeorm',
  logging: true,
  logger: 'file',

  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/app/database/migrations',
  },
};

export = config;
