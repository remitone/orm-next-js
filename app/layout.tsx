import "./globals.css";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
//import { AuthContextProvider } from "./services/providers/authentication-context";
import { headers } from "next/headers";
import { AppSettingProvider } from "@/services/providers/app-settings-context";
import { getTenantConfigs } from "@/utils/settings";
import { Metadata } from "next";
import React from "react";
import AuthSessionProvider from "@/services/providers/AuthSessionProvider";
import { getSession } from "@/services/authentication/CookieSession";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const hostname = headersList.get("hostname") ?? "localhost";
  const tenantConfigs = await getTenantConfigs(host, hostname);

  return {
    title: tenantConfigs.clientName + "- Online Remittance Portal",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const hostname = headersList.get("hostname") ?? "localhost";
  const tenantConfigs = await getTenantConfigs(host, hostname);
  console.log("Tenant Configs", { tenantConfigs });
  const domain = headersList.get("REMITONE_DOMAIN");
  const session = await getSession();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme={"light"} />
      </head>
      <body>
        <MantineProvider
          forceColorScheme={"light"}
          theme={{
            fontSizes: {
              xl: "30",
            },
            primaryColor: tenantConfigs.primaryColour,
          }}
        >
          <AppSettingProvider appSettings={tenantConfigs}>
            <AuthSessionProvider session={session!}>
              {children}
            </AuthSessionProvider>
          </AppSettingProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
