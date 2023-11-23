// types/global.d.ts

import { Remitter } from "@/types/remitter";
import { z } from "zod";

export {};

declare global {
  interface BaseResponse {
    responseId?: string;
    response_code?: string;
    status?: string;
    message?: string;
  }

  interface LoginResponse extends BaseResponse {
    result?: LoginResult | LoginResultLegacy;
  }

  interface LoginResult {
    session_token?: string;
    two_factor_authentication?: TwoFactorAuthentication;
    transfer_types?: TransferTypes;
    remitter_wallet?: R1Boolean;
    wallet_transfer_enabled?: R1Boolean;
    loyalty_points?: R1Boolean;
  }

  interface RemitterWalletLegacy {
    wallet_enabled: R1Boolean;
    wallet_transfer_enabled: R1Boolean;
  }

  export type R1Boolean = "f" | "t" | boolean | "true" | "false" | "1" | "0";

  //backward compatibility result
  interface LoginResultLegacy {
    session_token?: string;
    two_factor_authentication?: TwoFactorAuthentication;
    transfer_types?: TransferTypes;
    loyalty_points: R1Boolean;
    remitter_wallet: RemitterWalletLegacy;
  }

  interface TransferTypes {
    transfer_type?: string[];
  }

  interface TwoFactorAuthentication {
    required?: R1Boolean;
    type?: string;
    can_resend_code?: R1Boolean;
  }

  interface LoginData {
    username: string;
    password: string;
    domain?: string;
  }

  interface SeedResponse extends BaseResponse {
    result?: SeedResult;
  }

  interface SeedResult {
    seed?: string;
  }

  interface LogoutResponse extends BaseResponse {}

  type AppSettings = AppSetting[];

  type AppSetting = {
    baseUrl: string;
    serverPublicKey: string;
    primaryColour: string;
    clientName: string;
    domain: string;
    hostname: string;
  };

  type AppSettingType = {
    [propName: string]: AppSetting;
  };

  type cookieSession = {
    id: number;
    name: string;
    username: string;
    sessionToken: string;
    loginResponse: LoginResult;
    remitter: Pick<Remitter, "status" | "verified" | "remitter_id">;
    domain: string;
  };

  type LoginActionResponse = {
    error: boolean;
    success?: boolean;
    message?: string;
    remitter?: Remitter;
  };

  type ApiRequestProps = {
    baseUrl: string;
    username: string;
    session_token: string;
  };

  type GlobalSystemSettings = {
    twoFactorSettings: {
      required: boolean;
      type: string;
      canResedCode: boolean;
    };
    transferTypes: string[];
    walletEnabled: boolean;
    walletTransferEnabled: boolean;
    loyaltyPointsEnabled: boolean;
  };

  enum UsernameType {
    Email = "email",
    Mobile = "mobile",
  }

  type AuthSession = {
    sessionToken: string;
    username: string;
    settings: GlobalSystemSettings;
  };
}
