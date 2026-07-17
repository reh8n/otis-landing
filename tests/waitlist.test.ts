import assert from "node:assert/strict";
import test from "node:test";
import {
  handleWaitlistPost,
  normalizeSignup,
  saveWaitlistSignup,
  type WaitlistDatabase,
} from "../lib/waitlist.ts";

test("normalizes a valid email while preserving the trimmed original", () => {
  assert.deepEqual(
    normalizeSignup("  Rehan.Ali+Otis@Example.COM  ", "Hero"),
    {
      normalizedEmail: "rehan.ali+otis@example.com",
      originalEmail: "Rehan.Ali+Otis@Example.COM",
      source: "hero",
    },
  );
});

test("rejects empty and malformed email values", () => {
  for (const value of [
    "",
    "not-an-email",
    "@example.com",
    "a@@example.com",
    ".a@example.com",
    "a..b@example.com",
    "a@example",
    "a@-example.com",
  ]) {
    assert.equal(normalizeSignup(value), null, value);
  }
});

test("drops an invalid optional source without rejecting a valid signup", () => {
  assert.deepEqual(normalizeSignup("person@example.com", "utm source!"), {
    normalizedEmail: "person@example.com",
    originalEmail: "person@example.com",
    source: null,
  });
});

test("repeat normalized signups use an idempotent insert", async () => {
  const emails = new Set<string>();
  let insertSql = "";

  const database: WaitlistDatabase = {
    async query(query, values = []) {
      if (query.includes("ON CONFLICT")) {
        insertSql = query;
        emails.add(String(values[1]));
      }
    },
  };

  const first = normalizeSignup("Person@Example.com", "hero");
  const repeat = normalizeSignup("person@example.com", "footer");
  assert.ok(first);
  assert.ok(repeat);

  await saveWaitlistSignup(database, first);
  await saveWaitlistSignup(database, repeat);

  assert.match(insertSql, /ON CONFLICT \(normalized_email\) DO NOTHING/);
  assert.deepEqual([...emails], ["person@example.com"]);
});

test("the HTTP contract rejects invalid input without exposing membership", async () => {
  const response = await handleWaitlistPost(
    new Request("https://otis.example/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" }),
    }),
    null,
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: "Enter a valid email address.",
  });
});

test("the HTTP contract returns a generic server error when storage fails", async () => {
  const error = new Error("database unavailable");
  let reported: unknown;
  const database: WaitlistDatabase = {
    async query() {
      throw error;
    },
  };

  const response = await handleWaitlistPost(
    new Request("https://otis.example/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "person@example.com" }),
    }),
    database,
    (nextError) => {
      reported = nextError;
    },
  );

  assert.equal(response.status, 500);
  assert.equal(reported, error);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: "We couldn’t save your email. Please try again.",
  });
});
