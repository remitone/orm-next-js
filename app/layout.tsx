"use client";

import "./globals.css";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider, rem } from "@mantine/core";
import { AuthContextProvider } from "../common/context/authentication-context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              xl: rem(30),
            },
          }}
        >
          <AuthContextProvider>{children}</AuthContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
