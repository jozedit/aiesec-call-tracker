import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This pulls securely from your Vercel environment variables
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
