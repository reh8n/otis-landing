import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlistSignups = sqliteTable("waitlist_signups", {
  id: text("id").primaryKey(),
  normalizedEmail: text("normalized_email").notNull().unique(),
  originalEmail: text("original_email").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  source: text("source"),
});
