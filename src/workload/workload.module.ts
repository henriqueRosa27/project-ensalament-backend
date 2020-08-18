import { Module } from '@nestjs/common';
import { WorkloadController } from './workload.controller';
import { WorkloadService } from './workload.service';
import { WorkloadEntity } from './workload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkloadEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [WorkloadController],
  providers: [WorkloadService, JwtStrategy],
})
export class WorkloadModule {}
