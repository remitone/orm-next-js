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
    result?: LoginResult;
  }

  const r1BooleanSchema = z.custom<`${string}`>((val) => {
    return val == "true" || value == "1" || value == "t";
  });

  type r1Boolean = z.infer<typeof r1BooleanSchema>;

  interface LoginResult {
    session_token?: string;
    two_factor_authentication?: TwoFactorAuthentication;
    transfer_types?: TransferTypes;
    remitter_wallet?: string;
    wallet_transfer_enabled?: boolean;
    loyalty_points?: boolean;
  }

  interface TransferTypes {
    transfer_type?: string[];
  }

  interface TwoFactorAuthentication {
    required?: string;
    type?: string;
    can_resend_code?: boolean;
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

  export type R1Boolean = "f" | "t" | boolean | "true" | "false" | "1" | "0";

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
  };

  type ApiRequestProps = {
    baseUrl: string;
    username: string;
    session_token: string;
  };
}
