import "./globals.css";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
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
  const tenantConfigs = await getTenantConfigs();

  return {
    title: tenantConfigs.clientName + "- Online Remittance Portal",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenantConfigs = await getTenantConfigs();
  console.log("Tenant Configs", { tenantConfigs });
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
