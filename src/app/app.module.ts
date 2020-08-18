import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import * as ormconfig from './config/orm.config';
import { BuildingModule } from 'src/building/building.module';
import { RoomModule } from 'src/room/room.module';
import { CourseModule } from 'src/course/course.module';
import { TeamModule } from 'src/team/team.module';
import { WorkloadModule } from 'src/workload/workload.module';

const imports = [
  TypeOrmModule.forRoot(ormconfig),
  UserModule,
  AuthModule,
  BuildingModule,
  RoomModule,
  CourseModule,
  TeamModule,
  WorkloadModule,
];
@Module({
  imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
