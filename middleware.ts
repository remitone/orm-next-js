import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@/services/authentication/CookieSession";

async function hostNameResolverMiddleware(request: NextRequest) {
  const name = request.headers.get("host");
  console.log("host", name);
  console.log("hostname", request.headers.get("hostname"));
  //console.log({ request });
  let remitoneHostname = "";
  console.log(`hostname: ${name}`);
  switch (name) {
    case "localhost:3000":
      remitoneHostname = "local";
      break;
    case "localhost:3001":
      remitoneHostname = "APS";
      break;
    case "localhost:3002":
      remitoneHostname = "POL";
      break;
  }
  console.log("REMITONE DOMAIN FROM MIDDLEWARE", remitoneHostname);
  const response = NextResponse.next();
  response.headers.set("REMITONE_DOMAIN", remitoneHostname);

  return response;
}

async function authMiddleware(request: NextRequest) {
  const encryptedSession = request.cookies.get("loginSession")?.value;
  const loginSession = await getSession();
  if (!loginSession?.sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await hostNameResolverMiddleware(request);
  await authMiddleware(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
