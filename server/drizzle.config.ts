import type { Config } from 'drizzle-kit';

// import { config } from 'src/config';

export default {
  schema: './src/core/db/db.schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config;
