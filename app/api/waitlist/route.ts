import { getWaitlistDatabase } from "../../../db/runtime";
import { handleWaitlistPost } from "../../../lib/waitlist";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return handleWaitlistPost(request, await getWaitlistDatabase(), (error) => {
    console.error(
      "Waitlist signup failed",
      error instanceof Error ? error.message : "Unknown error",
    );
  });
}
