import { ConnectionOptions } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RoleEntity } from 'src/auth/roles.entity';
import { BuildingEntity } from 'src/building/building.entity';
import { RoomEntity } from 'src/room/room.entity';
import { CourseEntity } from 'src/course/course.entity';
import { TeamEntity } from 'src/team/team.entity';

import 'dotenv/config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTransactionMode: 'each',

  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    RoleEntity,
    UserEntity,
    BuildingEntity,
    RoomEntity,
    CourseEntity,
    TeamEntity,
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
