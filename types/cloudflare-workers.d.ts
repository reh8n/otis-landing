declare module "cloudflare:workers" {
  export const env: { DB?: import("../lib/waitlist").WaitlistDatabase };
}

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

type D1Database = import("../lib/waitlist").WaitlistDatabase;

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}
