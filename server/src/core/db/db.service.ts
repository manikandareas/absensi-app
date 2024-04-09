import { Injectable } from '@nestjs/common';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';

import { neon } from '@neondatabase/serverless';
import * as schema from './db.schema';
import { config } from '~/config';
@Injectable()
export class DbService {
  private db: NeonHttpDatabase<typeof schema>;
  private dbServerless: NeonDatabase<typeof schema>;

  constructor() {
    this.connect();
  }
  private async connect() {
    const sql = neon(config.databaseUri!);
    this.db = drizzle(sql, { schema });
  }

  // private async wsConnect() {
  //   const client = new Client(config.databasePoolUri);
  //   const pool = new Pool({ connectionString: config.databasePoolUri });
  //   client.neonConfig.webSocketConstructor = ws;
  //   this.dbServerless = drizzleServerless(pool, { schema });
  // }

  public getDbServerless(): NeonDatabase<typeof schema> {
    return this.dbServerless;
  }

  public getDb(): NeonHttpDatabase<typeof schema> {
    return this.db;
  }
}
