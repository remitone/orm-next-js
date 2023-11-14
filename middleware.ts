import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@/services/authentication/CookieSession";

async function authMiddleware(request: NextRequest) {
  const loginSession = await getSession();
  if (!loginSession?.sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //await hostNameResolverMiddleware(request);
  await authMiddleware(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
