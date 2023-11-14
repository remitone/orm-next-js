// "use client";
//
// import React, { createContext, useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { getRemitterProfile } from "../api/remitterws/remitter-user";
// import { login as authenticate, logout } from "@/api/remitterws/authentication";
// import { Remitter } from "@/types/remitter";
//
// type AuthContextProp = {
//   isLoggedIn: boolean;
//   authenticatedUser: null | Remitter;
//   login: (data: LoginData) => any;
//   logout: (domain: string) => void;
// };
// export const AuthContext = createContext<AuthContextProp>({
//   isLoggedIn: false,
//   authenticatedUser: null,
//   login: () => {},
//   logout: () => {},
// });
//
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//
//   const [user, setUser] = useState<Remitter | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//   const getRemitterUser: any = async (domain: string) => {
//     try {
//       return await getRemitterProfile(domain);
//     } catch (err) {
//       console.error("Error Fetching Remitter", err);
//     }
//   };
//
//   const login = async (data: LoginData) => {
//     const loginData: LoginData = {
//       username: data.username,
//       password: data.password,
//       domain: data?.domain,
//     };
//
//     await authenticate(loginData);
//
//     //load the remitter user
//     const remitterUser = await getRemitterUser(data.domain!);
//     console.log("Remitter Response", remitterUser);
//     localStorage.setItem(
//       "remitterUser",
//       JSON.stringify(remitterUser.result?.remitter!),
//     );
//     setUser(remitterUser);
//     setIsLoggedIn(true);
//     router.push("/dashboard");
//   };
//
//   const logOut = (domain: string) => {
//     logout(domain)
//       .then((success) => {
//         if (success) {
//           console.log("Successfully logged out");
//           clearAuthState();
//         }
//         setIsLoggedIn(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//
//     router.push("/");
//   };
//
//   const clearAuthState = () => {
//     localStorage.removeItem("sessionToken");
//     localStorage.removeItem("username");
//     localStorage.removeItem("remitterUser");
//     setUser(null);
//     setIsLoggedIn(false);
//   };
//
//   const loadLoggedInUser = () => {
//     try {
//       const remitterUser = localStorage.getItem("remitterUser");
//       console.log("UseEffect RemitterUser", remitterUser);
//       if (remitterUser != null) {
//         setUser(JSON.parse(remitterUser!));
//         setIsLoggedIn(true);
//         return;
//       } else {
//         clearAuthState();
//         return router.push("/");
//       }
//     } catch (err) {
//       console.log(err);
//       setIsLoggedIn(false);
//
//       return router.push("/");
//     }
//   };
//
//   useEffect(() => {
//     //loadLoggedInUser();
//     //otherwise send to home
//   }, []);
//
//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: isLoggedIn,
//         authenticatedUser: user,
//         login: login,
//         logout: logOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
