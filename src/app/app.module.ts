import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import * as ormconfig from './config/orm.config';
import { BuildingModule } from 'src/building/building.module';

const imports = [
  TypeOrmModule.forRoot(ormconfig),
  UserModule,
  AuthModule,
  BuildingModule,
];
@Module({
  imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
