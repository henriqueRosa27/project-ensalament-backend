import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456789!',
  database: 'ensalament',
  entities: [],
  migrationsTableName: 'migrations_typeorm',
  logging: true,
  logger: 'file',

  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/app/database/migrations',
  },
};

export = config;
