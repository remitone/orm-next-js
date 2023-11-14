import { sealData, unsealData } from "iron-session/edge";
import { cookies } from "next/headers";
import process from "process";
import { AuthSession } from "@/types/schema";

const sessionPassword = process.env.COOKIE_SESSION_PASSWORD as string;
if (!sessionPassword) throw new Error("COOKIE_SESSION_PASSWORD is not set");

export type User = {
  login: string;
};

const AUTH_COOKIE_NAME = "loginSession";
export async function getSession(): Promise<AuthSession | null> {
  const encryptedSession = cookies().get(AUTH_COOKIE_NAME)?.value;

  const session = encryptedSession
    ? ((await unsealData(encryptedSession, {
        password: sessionPassword,
      })) as string)
    : null;

  return session ? (JSON.parse(session) as AuthSession) : null;
}

export async function setSession(
  sessionData: AuthSession,
  domain: string,
): Promise<void> {
  const encryptedSession = await sealData(JSON.stringify(sessionData), {
    password: sessionPassword,
  });

  cookies().set({
    name: AUTH_COOKIE_NAME,
    value: encryptedSession,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
    httpOnly: true,
    domain: domain,
    path: "/",
  });
}

export async function removeSession() {
  cookies().delete(AUTH_COOKIE_NAME);
}
