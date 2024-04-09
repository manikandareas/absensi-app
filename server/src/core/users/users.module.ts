import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbModule } from '../db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { ClassesService } from '../classes/classes.service';
import { QrcodeService } from '~/lib/qrcode/qrcode.service';

@Module({
  imports: [DbModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService, ClassesService, QrcodeService],
  exports: [UsersService],
})
export class UsersModule {}
