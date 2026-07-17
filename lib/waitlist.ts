export const WAITLIST_SUCCESS_MESSAGE =
  "You’re on the list. We’ll share the next Otis update with you.";

export const WAITLIST_ERROR_MESSAGE =
  "We couldn’t save your email. Please try again.";

export const WAITLIST_VALIDATION_MESSAGE =
  "Enter a valid email address.";

export const CREATE_WAITLIST_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS waitlist_signups (
    id UUID PRIMARY KEY NOT NULL,
    normalized_email TEXT NOT NULL UNIQUE,
    original_email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    source TEXT
  )
`;

export type NormalizedSignup = {
  normalizedEmail: string;
  originalEmail: string;
  source: string | null;
};

export type WaitlistDatabase = {
  query(query: string, params?: unknown[]): Promise<unknown>;
};

function isValidDomain(domain: string) {
  if (domain.length > 253 || !domain.includes(".") || domain.includes("..")) {
    return false;
  }

  return domain.split(".").every((label) => {
    return (
      label.length > 0 &&
      label.length <= 63 &&
      /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)
    );
  });
}

export function normalizeSignup(
  emailValue: unknown,
  sourceValue?: unknown,
): NormalizedSignup | null {
  if (typeof emailValue !== "string") return null;

  const originalEmail = emailValue.normalize("NFKC").trim();
  const normalizedEmail = originalEmail.toLowerCase();

  if (!normalizedEmail || normalizedEmail.length > 254) return null;

  const atIndex = normalizedEmail.indexOf("@");
  if (atIndex <= 0 || atIndex !== normalizedEmail.lastIndexOf("@")) return null;

  const local = normalizedEmail.slice(0, atIndex);
  const domain = normalizedEmail.slice(atIndex + 1);

  if (
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) ||
    !isValidDomain(domain)
  ) {
    return null;
  }

  const source =
    typeof sourceValue === "string" &&
    /^[a-z0-9][a-z0-9:_-]{0,79}$/i.test(sourceValue.trim())
      ? sourceValue.trim().toLowerCase()
      : null;

  return { normalizedEmail, originalEmail, source };
}

export async function saveWaitlistSignup(
  database: WaitlistDatabase,
  signup: NormalizedSignup,
) {
  await database.query(CREATE_WAITLIST_TABLE_SQL);

  await database.query(
    `INSERT INTO waitlist_signups
      (id, normalized_email, original_email, source)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (normalized_email) DO NOTHING`,
    [
      crypto.randomUUID(),
      signup.normalizedEmail,
      signup.originalEmail,
      signup.source,
    ],
  );
}

export async function handleWaitlistPost(
  request: Request,
  database: WaitlistDatabase | null,
  reportError: (error: unknown) => void = () => {},
) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: WAITLIST_VALIDATION_MESSAGE },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json(
      { ok: false, error: WAITLIST_VALIDATION_MESSAGE },
      { status: 400 },
    );
  }

  const body = payload as { email?: unknown; source?: unknown };
  const signup = normalizeSignup(body.email, body.source);

  if (!signup) {
    return Response.json(
      { ok: false, error: WAITLIST_VALIDATION_MESSAGE },
      { status: 400 },
    );
  }

  try {
    if (!database) throw new Error("DATABASE_URL is unavailable");
    await saveWaitlistSignup(database, signup);

    return Response.json({
      ok: true,
      message: WAITLIST_SUCCESS_MESSAGE,
    });
  } catch (error) {
    reportError(error);
    return Response.json(
      { ok: false, error: WAITLIST_ERROR_MESSAGE },
      { status: 500 },
    );
  }
}
