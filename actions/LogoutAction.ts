"use server";

import { removeSession } from "@/services/authentication/CookieSession";
import { redirect } from "next/navigation";
import ApiRequestProps from "@/types/global";
import ApiClient from "@/services/api/remitterws/client";

export async function signOut(requestData: ApiRequestProps) {
  const apiRes = await ApiClient.post({
    url: `${requestData.baseUrl}/auth/logout`,
    body: {
      username: requestData.username,
      session_token: requestData.session_token,
    },
  });
  const logoutResponse = apiRes.response as LogoutResponse;

  if (logoutResponse.status === "FAIL") {
    return {
      success: false,
      message: logoutResponse.message,
    };
  }

  await removeSession();

  redirect("/");
}
