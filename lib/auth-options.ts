// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { parseStringPromise } from "xml2js";
// import { encrypt } from "../utils/encryption";
// import { RemitterResponse } from "../types/remitter";
// import { getTenantConfigs } from "../utils/settings";
//
// export const authOptions: AuthOptions = {
//   pages: {
//     signIn: "/",
//   },
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: "RemitterWSLogin",
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: {
//           label: "Email Address",
//           type: "email",
//           placeholder: "email@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       // @ts-ignore
//       async authorize(credentials, req) {
//         console.log({ credentials });
//         let host = "localhost:3000";
//         if (req.headers != null) {
//           let { host } = req.headers;
//         }
//         const configs = await getTenantConfigs(host);
//         const BASE_URL = configs.baseUrl;
//
//         const response = await fetch(`${BASE_URL}/auth/getSeed`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams({
//             username: credentials?.email!,
//           }),
//         });
//
//         if (!response.ok) {
//           throw new Error("Invalid credentials");
//         }
//
//         const xmlResponse = await response.text();
//         const seed = await parseStringPromise(xmlResponse, {
//           normalize: true,
//           explicitArray: false,
//         });
//
//         const seedResponse = seed.response as SeedResponse;
//         const status = seedResponse.status;
//         console.log(seedResponse);
//         console.log(status);
//
//         if (status === "FAIL") {
//           console.log(
//             `Failed response from getSeed(): ${seedResponse.message}`,
//           );
//           throw new Error(seedResponse.message);
//         }
//
//         const secureData = {
//           seed: seedResponse.result?.seed,
//           password: credentials?.password!,
//         };
//
//         const encryptedData = await encrypt(
//           secureData,
//           configs.serverPublicKey,
//         );
//         const loginApiResponse = await fetch(`${BASE_URL}/auth/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams({
//             username: credentials?.email!,
//             encrypted_data: encryptedData,
//           }),
//         });
//
//         if (!loginApiResponse.ok) {
//           throw new Error("Invalid credentials");
//         }
//
//         const loginXmlData = await loginApiResponse.text();
//         const loginData = await parseStringPromise(loginXmlData, {
//           normalize: true,
//           explicitArray: false,
//         });
//
//         const loginResponse: LoginResponse =
//           loginData.response as LoginResponse;
//         //   const loginResponse: LoginResponse = response.data.response as LoginResponse;
//         const loginStatus = loginResponse.status;
//         if (loginStatus === "FAIL") {
//           console.log(`Failed login: ${loginResponse.message}`);
//           throw new Error(loginResponse.message);
//         }
//
//         //load Remitter User
//         const remitterApiResponse = await fetch(
//           `${BASE_URL}/remitterUser/getProfile`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               username: credentials?.email!,
//               session_token: loginResponse.result?.session_token!,
//             }),
//           },
//         );
//
//         const remitterXmlData = await remitterApiResponse.text();
//         const remitterData = await parseStringPromise(remitterXmlData, {
//           normalize: true,
//           explicitArray: false,
//         });
//
//         const remitterResponse = remitterData.response as RemitterResponse;
//
//         // if (loginStatus === "SUCCESS") {
//         //   //localStorage.setItem("sessionToken", loginResponse.result?.session_token!);
//         //   //localStorage.setItem("username", loginData.username);
//         //   return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//         // }
//
//         //console.log(remitterResponse);
//         if (remitterResponse.status === "SUCCESS") {
//           //localStorage.setItem("sessionToken", loginResponse.result?.session_token!);
//           //localStorage.setItem("username", loginData.username);
//           const remitter = remitterResponse.result?.remitter;
//
//           return {
//             id: remitter?.remitter_id,
//             name: remitter?.firstname,
//             email: credentials?.email!,
//             session_token: loginResponse.result?.session_token,
//             //remitter: remitter,
//           };
//         }
//
//         // if (!credentials || !credentials.email || !credentials.password) {
//         //   return null;
//         // }
//         //
//         // return users.find((user) => user.email == credentials.email);
//         // console.log(req.headers);
//         // const domain = decodeURIComponent(req.headers?.host);
//         // console.log(domain);
//         // You need to provide your own logic here that takes the credentials
//         // submitted and returns either a object representing a user or value
//         // that is false/null if the credentials are invalid.
//         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//         // You can also use the `req` object to obtain additional parameters
//         // (i.e., the request IP address)
//         // const res = await fetch("/your/endpoint", {
//         //   method: "POST",
//         //   body: JSON.stringify(credentials),
//         //   headers: { "Content-Type": "application/json" },
//         // });
//         // const user = await res.json();
//
//         // If no error and we have user data, return it
//         // if (res.ok && user) {
//         //   return user;
//         // }
//         // Return null if user data could not be retrieved
//         //
//
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     // @ts-ignore
//     async jwt({ token, account, user }) {
//       console.log("JWT Callback", { token, account, user });
//       if (user) {
//         token.user = user;
//         //token.accessToken = user.session_token;
//       }
//
//       return { ...token, ...user };
//     },
//     // @ts-ignore
//     async session({ session, token }) {
//       console.log("Session callback", { session, token });
//       if (token && session.user) {
//         //session.session_token = token.accessToken;
//       }
//
//       return session;
//     },
//   },
// };
