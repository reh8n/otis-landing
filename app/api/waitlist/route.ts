import { env } from "cloudflare:workers";
import { handleWaitlistPost } from "../../../lib/waitlist";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleWaitlistPost(request, env.DB ?? null, (error) => {
    console.error(
      "Waitlist signup failed",
      error instanceof Error ? error.message : "Unknown error",
    );
  });
}
