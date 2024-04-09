import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '../db/db.module';
import { UsersService } from '../users/users.service';
import { QrcodeService } from '~/lib/qrcode/qrcode.service';

@Module({
  imports: [DbModule, JwtModule],
  controllers: [ClassesController],
  providers: [ClassesService, UsersService, QrcodeService],
})
export class ClassesModule {}
