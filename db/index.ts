import { neon } from "@neondatabase/serverless";
import type { WaitlistDatabase } from "../lib/waitlist";

export function getWaitlistDatabase(): WaitlistDatabase | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  const sql = neon(databaseUrl);
  return {
    query(query, params = []) {
      return sql.query(query, params);
    },
  };
}
