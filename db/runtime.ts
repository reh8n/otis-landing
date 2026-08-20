import { neon } from "@neondatabase/serverless";
import type { WaitlistDatabase } from "../lib/waitlist";

export async function getWaitlistDatabase(): Promise<WaitlistDatabase | null> {
  if (process.env.VERCEL === "1") {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) return null;
    const sql = neon(databaseUrl);
    return {
      prepare(query) {
        let values: unknown[] = [];
        return {
          bind(...nextValues: unknown[]) {
            values = nextValues;
            return this;
          },
          async run() {
            let postgresQuery = query
              .replace(/INSERT OR IGNORE INTO/i, "INSERT INTO")
              .replace(/\?(\d+)/g, (_, index: string) => `$${index}`);
            if (/^\s*INSERT INTO waitlist_signups/i.test(postgresQuery)) {
              postgresQuery += " ON CONFLICT (normalized_email) DO NOTHING";
            }
            await sql.query(postgresQuery, values);
          },
        };
      },
    };
  }

  const { env } = await import("cloudflare:workers");
  return env.DB ?? null;
}
