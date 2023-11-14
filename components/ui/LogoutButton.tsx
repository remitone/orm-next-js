"use client";

import React from "react";
import { Button } from "@mantine/core";
// @ts-ignore
import { useFormStatus as useFormStatus } from "react-dom";

export default function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button loading={pending} disabled={pending} type="submit" color={"red"}>
      Logout
    </Button>
  );
}
