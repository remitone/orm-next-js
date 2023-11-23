"use client";

import { useRemitter } from "@/services/providers/RemitterUserProvider";
import { Text } from "@mantine/core";
import React from "react";
import { useTranslations } from "next-intl";

export default function RemitterWelcomeTitle() {
  const RemitterHook = useRemitter();
  const remitter = RemitterHook((state) => state.remitter);
  const t = useTranslations("Dashboard");
  return (
    <Text size={"xl"} fw={"bold"}>
      {t("page.welcome_title", {
        name: remitter && remitter.firstname ? remitter.firstname : "....",
      })}
    </Text>
  );
}
