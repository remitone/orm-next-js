"use client";

import React from "react";
import { Button } from "@mantine/core";
// @ts-ignore
import { useFormStatus as useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function LoginButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Login");
  return (
    <Button
      fullWidth
      type="submit"
      radius="xl"
      loading={pending}
      disabled={pending}
    >
      {t("fields.submit_button")}
    </Button>
  );
}
