import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

test("generated migration creates the waitlist schema and unique email constraint", () => {
  const migration = readdirSync("drizzle").find((name) => name.endsWith(".sql"));
  assert.ok(migration, "expected a generated Drizzle migration");

  const database = new DatabaseSync(":memory:");
  database.exec(readFileSync(`drizzle/${migration}`, "utf8"));

  const columns = database
    .prepare("PRAGMA table_info(waitlist_signups)")
    .all()
    .map((column) => String(column.name));

  assert.deepEqual(columns, [
    "id",
    "normalized_email",
    "original_email",
    "created_at",
    "source",
  ]);

  const insert = database.prepare(
    `INSERT INTO waitlist_signups
      (id, normalized_email, original_email)
     VALUES (?, ?, ?)`,
  );
  insert.run("one", "person@example.com", "Person@example.com");

  assert.throws(
    () => insert.run("two", "person@example.com", "person@example.com"),
    /UNIQUE constraint failed/,
  );

  database.close();
});
