"use client";

import React from "react";
import { Button } from "@mantine/core";
// @ts-ignore
import { useFormStatus as useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      fullWidth
      type="submit"
      radius="xl"
      loading={pending}
      disabled={pending}
    >
      Login
    </Button>
  );
}
