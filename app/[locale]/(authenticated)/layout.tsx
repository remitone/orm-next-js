import React from "react";
import DashboardLayoutWrapper from "@/components/ui/DashboardLayoutWrapper";
import { getSession } from "@/services/authentication/CookieSession";
import { notFound, redirect } from "next/navigation";
import RemitterUserProvider from "@/services/providers/RemitterUserProvider";
import { getTenantConfigs } from "@/utils/settings";
import ApiClient from "@/services/api/remitterws/client";
import { RemitterResponse } from "@/types/remitter";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function AuthenticatedLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getSession();

  if (session?.sessionToken == null) {
    redirect("/");
  }

  const tenantConfigs = await getTenantConfigs();
  const messages = await getMessages();

  //load Remitter User
  const remitterResult = await ApiClient.post({
    url: `${tenantConfigs.baseUrl}/remitterUser/getProfile`,
    body: {
      username: session.username,
      session_token: session.sessionToken,
      options: {
        next: { revalidate: 3600 },
      },
    },
  });

  const remitterResponse = remitterResult.response as RemitterResponse;
  console.log("Remitter Response", remitterResponse);
  if (remitterResponse.status === "FAIL") {
    console.log(`Failed login: ${remitterResponse.message}`);
    return notFound();
  }

  return (
    <RemitterUserProvider remitter={remitterResponse.result?.remitter!}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
      </NextIntlClientProvider>
    </RemitterUserProvider>
  );
}
