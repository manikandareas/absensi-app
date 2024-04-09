import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DbModule } from '../db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [DbModule, JwtModule, UsersModule],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
