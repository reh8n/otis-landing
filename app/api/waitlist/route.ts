import { getWaitlistDatabase } from "../../../db";
import { handleWaitlistPost } from "../../../lib/waitlist";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleWaitlistPost(request, getWaitlistDatabase(), (error) => {
    console.error(
      "Waitlist signup failed",
      error instanceof Error ? error.message : "Unknown error",
    );
  });
}
