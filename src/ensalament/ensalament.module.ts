import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { EnsalamentController } from './ensalament.controller';
import { EnsalamentService } from './ensalament.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from 'src/building/building.entity';
import { CourseEntity } from 'src/course/course.entity';
import { EnsalamentEntity } from './ensalament.entity';
import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
import { GetDatasService } from './services/get-datas.service';
import { CreateEnsalamentService } from './services/create.service';
import { GetByIdEnsalamentService } from './services/get-by-id.service';
import { GetDetailsEnsalamentService } from './services/get-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuildingEntity,
      CourseEntity,
      EnsalamentEntity,
      RoomEntity,
      TeamEntity,
    ]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [EnsalamentController],
  providers: [
    EnsalamentService,
    GetDatasService,
    CreateEnsalamentService,
    CreateEnsalamentService,
    GetByIdEnsalamentService,
    GetDetailsEnsalamentService,
  ],
})
export class EnsalamentModule {}
