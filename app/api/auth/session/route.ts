import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const encryptedSession = cookieStore.get("loginSession")?.value;

  if (encryptedSession == null) {
    return Response.json({ isLoggedIn: false });
  }

  // const session = encryptedSession
  //   ? await unsealData(encryptedSession, {
  //       password: process.env.COOKIE_SESSION_PASSWORD!,
  //     })
  //   : null;
  //
  // const authSession = AuthSessionSchema.safeParse(
  //   JSON.parse(session as unknown as string),
  // );
  // if (!authSession.success) {
  //   return Response.json(authSession.error.message);
  // }

  //return Response.json({ ...authSession.data, isLoggedIn: true });
  return Response.json({ loginSession: encryptedSession, isLoggedIn: true });

  // return Response.json({ data });
}
