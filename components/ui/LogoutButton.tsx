"use client";

import React from "react";
import { Button } from "@mantine/core";
// @ts-ignore
import { useFormStatus as useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Dashboard");
  return (
    <Button loading={pending} disabled={pending} type="submit" color={"red"}>
      {t("page.logout_button")}
    </Button>
  );
}
