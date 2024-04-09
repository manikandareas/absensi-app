import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
