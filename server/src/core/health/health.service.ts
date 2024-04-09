import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { sql } from 'drizzle-orm';

@Injectable()
export class HealthService {
  constructor(private readonly dbService: DbService) {}

  private readonly db = this.dbService.getDb();
  async checkDatabaseConnection() {
    const startTime = performance.now();
    const testConnection = await this.db.execute(sql`SELECT
    COUNT(*) as total_rows,
    SUM(CASE WHEN id is null THEN 1 ELSE 0 END) AS null_values,
    SUM(CASE WHEN name = '' THEN 1 ELSE 0 END) AS empty_values
    FROM users`);

    const endTime = performance.now();
    const responseTime = `${(endTime - startTime).toFixed(2)}ms`;
    return {
      status: !!testConnection ? 'connected' : 'disconnected',
      response_time: responseTime,
    };
  }
}
