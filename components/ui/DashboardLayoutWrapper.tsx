"use client";

import React, { useContext } from "react";
import { AppShell, Flex, Image as MantineImage, NavLink } from "@mantine/core";
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
import Link from "next/link";
import Image from "next/image";

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
  let logoImage = `${appSetting?.domain}-logo.png`;
  if (appSetting?.domain.includes("localhost")) {
    logoImage = "localhost-logo.png";
  }

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
          <MantineImage
            component={Image}
            w={130}
            h={"auto"}
            fit={"contain"}
            p={15}
            src={`/${logoImage}`}
            width={100}
            height={100}
            alt={`${appSetting?.clientName} Logo`}
          />
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Home"
          component={Link}
          leftSection={<IconHome2 size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label="Send Money"
          component={Link}
          leftSection={<IconCashBanknote size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label="My Wallet"
          component={Link}
          leftSection={<IconWallet size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label="Check Transfer Status"
          component={Link}
          leftSection={<IconCheck size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label="Beneficiaries"
          component={Link}
          leftSection={<IconUsers size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label="User Guide"
          component={Link}
          leftSection={<IconInfoCircleFilled size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label="Contact Us"
          component={Link}
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
