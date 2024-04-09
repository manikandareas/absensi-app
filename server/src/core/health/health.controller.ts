import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get()
  async getHealthyApi() {
    return {
      status: HttpStatus.OK,
      database: await this.healthService.checkDatabaseConnection(),
    };
  }
}
