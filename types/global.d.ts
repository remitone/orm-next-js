// types/global.d.ts

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
  }

  interface SeedResponse extends BaseResponse {
    result?: SeedResult;
  }

  interface SeedResult {
    seed?: string;
  }

  interface LogoutResponse extends BaseResponse {}

  export type R1Boolean = "f" | "t" | boolean | "true" | "false" | "1" | "0";
}
