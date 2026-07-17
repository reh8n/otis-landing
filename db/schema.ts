import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const waitlistSignups = pgTable("waitlist_signups", {
  id: uuid("id").primaryKey(),
  normalizedEmail: text("normalized_email").notNull().unique(),
  originalEmail: text("original_email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  source: text("source"),
});
