"use client";

import React, { useContext } from "react";
import {
  AuthContext,
  AuthContextProvider,
} from "../../common/context/authentication-context";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Button, Flex, Image, NavLink } from "@mantine/core";
import {
  IconCashBanknote,
  IconCheck,
  IconHome2,
  IconInfoCircleFilled,
  IconMail,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";
import User from "./dashboard/_user";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, authenticatedUser, isLoggedIn } = useContext(AuthContext);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AuthContextProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>
            <Image
              w={130}
              h={"auto"}
              fit={"contain"}
              p={15}
              src="http://localhost/orm/images/logo.png"
            />
          </div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <NavLink
            label="Home"
            leftSection={<IconHome2 size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <NavLink
            label="Send Money"
            leftSection={<IconCashBanknote size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <NavLink
            label="My Wallet"
            leftSection={<IconWallet size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <NavLink
            label="Check Transfer Status"
            leftSection={<IconCheck size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <NavLink
            label="Beneficiaries"
            leftSection={<IconUsers size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <NavLink
            label="User Guide"
            leftSection={<IconInfoCircleFilled size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <NavLink
            label="Contact Us"
            leftSection={<IconMail size="2rem" stroke={1.5} />}
            href={"/dashboard"}
          />
          <Flex columnGap={3} pt={50}>
            <User></User>
          </Flex>
        </AppShell.Navbar>

        <AppShell.Main>
          <Flex align={"flex-end"} justify={"flex-end"} mt={20}>
            <Button onClick={logout}>Logout</Button>
          </Flex>

          {children}
        </AppShell.Main>
      </AppShell>
    </AuthContextProvider>
  );
}
