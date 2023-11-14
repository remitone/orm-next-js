"use client";

import React from "react";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function BurgerMenu() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />;
}
