"use server";

import ApiClient from "@/services/api/remitterws/client";
import { encrypt } from "@/utils/encryption";
import { setSession } from "@/services/authentication/CookieSession";
import { Converter } from "@/utils/converter";

export async function LoginAction(
  appSettings: AppSetting,
  loginData: LoginData
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

  let loginResponse = loginResult.response as LoginResponse;
  let isLegacyResult = typeof loginResponse.result?.remitter_wallet == "object";

  console.log("Login Response", loginResponse);
  if (loginResponse.status === "FAIL") {
    console.log(`Failed login: ${loginResponse.message}`);
    return {
      error: true,
      message: loginResponse.message,
    };
  }

  //load Remitter User
  // const remitterResult = await ApiClient.post({
  //   url: `${BASE_URL}/remitterUser/getProfile`,
  //   body: {
  //     username: loginData?.username!,
  //     session_token: loginResponse.result?.session_token!,
  //     options: {
  //       next: { revalidate: 3600 },
  //     },
  //   },
  // });

  // const remitterResponse = remitterResult.response as RemitterResponse;
  // console.log("Remitter Response", remitterResponse);
  // if (remitterResponse.status === "FAIL") {
  //   console.log(`Failed login: ${remitterResponse.message}`);
  //   return {
  //     error: true,
  //     message: remitterResponse.message,
  //   };
  // }

  //const remitter = remitterResponse.result?.remitter;
  const domain = "." + appSettings.hostname;
  const twoFactorSettings = loginResponse.result?.two_factor_authentication;
  const transferTypes = loginResponse.result?.transfer_types?.transfer_type;

  //if
  let walletEnabled = false;
  let walletTransferEnabled = false;
  let loyaltyPointsEnabled = false;
  if (isLegacyResult) {
    const legacyResponse = loginResponse.result as LoginResultLegacy;
    walletEnabled = Converter.boolFromString(
      legacyResponse.remitter_wallet.wallet_enabled
    );
    walletTransferEnabled = Converter.boolFromString(
      legacyResponse.remitter_wallet.wallet_transfer_enabled
    );
    loyaltyPointsEnabled = Converter.boolFromString(
      legacyResponse.loyalty_points
    );
  } else {
    const originalLoginResponse = loginResponse.result as LoginResult;
    walletEnabled = Converter.boolFromString(
      originalLoginResponse?.remitter_wallet!
    );
    walletTransferEnabled = Converter.boolFromString(
      originalLoginResponse?.wallet_transfer_enabled!
    );
    loyaltyPointsEnabled = Converter.boolFromString(
      originalLoginResponse?.loyalty_points!
    );
  }

  const session: AuthSession = {
    username: loginData?.username!,
    sessionToken: loginResponse.result?.session_token!,
    settings: {
      twoFactorSettings: {
        required: Converter.boolFromString(twoFactorSettings?.required!),
        type: twoFactorSettings?.type!,
        canResedCode: Converter.boolFromString(
          twoFactorSettings?.can_resend_code!
        ),
      },
      transferTypes: transferTypes!,
      walletEnabled: walletEnabled,
      walletTransferEnabled: walletTransferEnabled,
      loyaltyPointsEnabled: loyaltyPointsEnabled,
    },
  };
  console.log("Auth Session", { session });
  //useRemitterStore.setState({ remitter: remitter });

  await setSession(session, domain);

  return {
    success: true,
    error: false,
    //remitter: remitter,
  };
}
