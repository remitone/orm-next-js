"use server";

import ApiClient from "@/services/api/remitterws/client";
import { encrypt } from "@/utils/encryption";
import { RemitterResponse } from "@/types/remitter";
import { AuthSession } from "@/types/schema";
import { setSession } from "@/services/authentication/CookieSession";

export async function LoginAction(
  appSettings: AppSetting,
  loginData: LoginData,
): Promise<LoginActionResponse> {
  const BASE_URL = appSettings.baseUrl;
  console.log({ loginData });
  console.log({ BASE_URL });

  let result = await ApiClient.post({
    url: `${BASE_URL}/auth/getSeed`,
    body: {
      username: loginData.username,
    },
    options: {
      next: { revalidate: 0 }, //to stop caching this request
    },
  });

  const seedResponse = result.response as SeedResponse;
  console.log("Seed Response", seedResponse);
  if (seedResponse.status === "FAIL") {
    console.log(`Failed response from getSeed(): ${seedResponse.message}`);
    return {
      error: true,
      message: seedResponse.message,
    };
  }

  const secureData = {
    seed: seedResponse.result?.seed,
    password: loginData?.password!,
  };

  const encryptedData = await encrypt(secureData, appSettings.serverPublicKey);
  const loginResult = await ApiClient.post({
    url: `${BASE_URL}/auth/login`,
    body: {
      username: loginData?.username!,
      encrypted_data: encryptedData,
      options: {
        next: { revalidate: 0 }, //to stop caching this request
      },
    },
  });

  const loginResponse: LoginResponse = loginResult.response as LoginResponse;
  console.log("Login Response", loginResponse);
  if (loginResponse.status === "FAIL") {
    console.log(`Failed login: ${loginResponse.message}`);
    return {
      error: true,
      message: loginResponse.message,
    };
  }

  //load Remitter User
  const remitterResult = await ApiClient.post({
    url: `${BASE_URL}/remitterUser/getProfile`,
    body: {
      username: loginData?.username!,
      session_token: loginResponse.result?.session_token!,
      options: {
        next: { revalidate: 3600 },
      },
    },
  });

  const remitterResponse = remitterResult.response as RemitterResponse;
  console.log("Remitter Response", remitterResponse);
  if (remitterResponse.status === "FAIL") {
    console.log(`Failed login: ${remitterResponse.message}`);
    return {
      error: true,
      message: remitterResponse.message,
    };
  }

  const remitter = remitterResponse.result?.remitter;

  let domain = "." + appSettings.hostname;

  const session: AuthSession = {
    id: remitter?.remitter_id as unknown as string,
    username: loginData?.username!,
    name: remitter?.firstname! + " " + remitter?.lastname,
    sessionToken: loginResponse.result?.session_token!,
  };

  await setSession(session, domain);

  return {
    success: true,
    error: false,
  };
}
