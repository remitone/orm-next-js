import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getSession } from "@/services/authentication/CookieSession";
import { locales as supportedLocales } from "@/lib/localConfig";

function getLocale(request: NextRequest) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = supportedLocales;
  const defaultLocale = "en";

  return matchLocale(languages, locales, defaultLocale);
}

async function authMiddleware(request: NextRequest) {
  const loginSession = await getSession();
  if (!loginSession?.sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await authMiddleware(request);
  const defaultLocale = getLocale(request);

  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: supportedLocales,

    // Used when no locale matches
    defaultLocale: defaultLocale,
    //localePrefix: "always",
  });

  const response = handleI18nRouting(request);
  response.headers.set("x-default-locale", defaultLocale);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/(es|en|ar|si)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
