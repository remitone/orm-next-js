"use client";

import React, { useContext } from "react";
import { AppShell, Flex, Image, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BurgerMenu from "./BurgerMenu";
import {
  IconCashBanknote,
  IconCheck,
  IconHome2,
  IconInfoCircleFilled,
  IconMail,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";
import User from "../../app/(authenticated)/dashboard/_user";
import LogoutButton from "./LogoutButton";
import { signOut } from "@/actions/LogoutAction";
import { AppSettingsContext } from "@/services/providers/app-settings-context";
import { useAuthSession } from "@/hooks/useSession";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const appSetting = useContext(AppSettingsContext);
  const session = useAuthSession();
  const apiRequestProps: ApiRequestProps = {
    baseUrl: appSetting?.baseUrl!,
    username: session.username,
    session_token: session.sessionToken,
  };
  const logOut = signOut.bind(null, apiRequestProps);

  return (
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
        <BurgerMenu />
        <div>
          <Image
            w={130}
            h={"auto"}
            fit={"contain"}
            p={15}
            src="http://localhost/orm/images/logo.png"
            alt="Logo"
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
          <form action={logOut}>
            <LogoutButton />
          </form>
        </Flex>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
