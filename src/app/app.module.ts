import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import * as ormconfig from './config/orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
