"use client";

import React, { createContext, useEffect } from "react";

export const AuthContext = createContext<AuthSession | null>(null);
export default function AuthSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthSession;
}) {
  //const [session, setSession] = useState<AuthSession | null>(null);
  //const [loading, setLoading] = useState(true);
  //const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const fetchSession = () => {
  //   fetch("/api/auth/session")
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       if (data.isLoggedIn) {
  //         const session = data.loginSession
  //           ? unsealData(data.loginSession, {
  //               password: "LpbHY6wv/S8J7LGCcNsbtKYOSwa+EUctp6NKfgShHho=",
  //             }).then((decryptedData) => {
  //               const authSession = AuthSessionSchema.safeParse(
  //                 JSON.parse(decryptedData as unknown as string),
  //               );
  //
  //               if (!authSession.success) {
  //                 setErrorMessage(fromZodError(authSession.error).message);
  //               } else {
  //                 //setSession(authSession.data);
  //               }
  //             })
  //           : null;
  //       }
  //       console.log(data);
  //     })
  //     .catch((err) => setErrorMessage(err.message))
  //     .then(() => setLoading(false));
  // };

  useEffect(() => {
    //fetchSession();
  }, []);

  //if (errorMessage) return <p>{errorMessage}</p>;
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
