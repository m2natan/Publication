import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(async function middleware(req: NextRequest) {
  // Optionally customize logic per route or role here
  return NextResponse.next();
});

// Protect specific routes:
export const config = {
  matcher: ["/home", "/add", "/update", "/generate"],
};
