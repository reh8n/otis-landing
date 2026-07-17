import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

test("generated migration creates the waitlist schema and unique email constraint", () => {
  const migration = readdirSync("drizzle").find((name) => name.endsWith(".sql"));
  assert.ok(migration, "expected a generated Drizzle migration");

  const sql = readFileSync(`drizzle/${migration}`, "utf8");
  assert.match(sql, /CREATE TABLE "waitlist_signups"/);
  assert.match(sql, /"id" uuid PRIMARY KEY NOT NULL/);
  assert.match(sql, /"normalized_email" text NOT NULL/);
  assert.match(sql, /"original_email" text NOT NULL/);
  assert.match(sql, /"created_at" timestamp with time zone DEFAULT now\(\) NOT NULL/);
  assert.match(sql, /"source" text/);
  assert.match(sql, /CONSTRAINT "waitlist_signups_normalized_email_unique" UNIQUE\("normalized_email"\)/);
});
