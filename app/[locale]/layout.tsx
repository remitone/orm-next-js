import "@mantine/core/styles.css";
import localFont from "next/font/local";
import {
  ColorSchemeScript,
  Container,
  DirectionProvider,
  MantineProvider,
  rem,
} from "@mantine/core";
import { AppSettingProvider } from "@/services/providers/app-settings-context";
import { getTenantConfigs } from "@/utils/settings";
import { Metadata } from "next";
import React from "react";
import AuthSessionProvider from "@/services/providers/AuthSessionProvider";
import { getSession } from "@/services/authentication/CookieSession";
import LocalSwitcher from "@/components/LocalSwitcher";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import useTextDirection from "@/lib/useTextDirection";

// const inter = Inter({ subsets: ["latin"] });
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "100", "200", "700"],
// });
const calOpenSansFont = localFont({
  src: "../../public/fonts/cal-open-sans.woff2",
});

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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tenantConfigs = await getTenantConfigs();
  console.log("Tenant Configs", { tenantConfigs });
  console.log("Local Configs", { locale });
  const session = await getSession();
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const direction = useTextDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <head>
        <ColorSchemeScript defaultColorScheme={"light"} />
      </head>
      <body>
        <DirectionProvider>
          <MantineProvider
            forceColorScheme={"light"}
            theme={{
              fontFamily: calOpenSansFont.style.fontFamily,
              fontSizes: {
                xl: rem("40"),
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
        </DirectionProvider>
      </body>
    </html>
  );
}
