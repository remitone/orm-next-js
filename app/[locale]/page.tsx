import LoginForm from "@/components/LoginForm";
import { getSession } from "@/services/authentication/CookieSession";
import { redirect } from "@/lib/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "next/dist/lib/pick";
import LocalSwitcher from "@/components/LocalSwitcher";
import { Container } from "@mantine/core";
import React from "react";

export default async function Home() {
  const session = await getSession();

  if (session?.sessionToken != null) {
    redirect("/dashboard");
  }

  const messages = await getMessages();
  const t = await getTranslations("LocalSwitcher");
  return (
    <main>
      <NextIntlClientProvider messages={pick(messages, ["Login"])}>
        <Container p={"20px"} mt={20} maw={200}>
          <LocalSwitcher language={t("fields.language_select")} />
        </Container>
        <LoginForm />
      </NextIntlClientProvider>
    </main>
  );
}
