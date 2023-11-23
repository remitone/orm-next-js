"use client";

import React, { useContext } from "react";
import {
  AppShell,
  Box,
  Flex,
  Image as MantineImage,
  NavLink,
} from "@mantine/core";
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
import User from "@/app/[locale]/(authenticated)/dashboard/_user";
import LogoutButton from "./LogoutButton";
import { signOut } from "@/actions/LogoutAction";
import { AppSettingsContext } from "@/services/providers/app-settings-context";
import { useAuthSession } from "@/hooks/useSession";
import { Link } from "@/lib/navigation";
import Image from "next/image";
import LocalSwitcher from "@/components/LocalSwitcher";
import { useTranslations } from "next-intl";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const appSetting = useContext(AppSettingsContext);
  const session = useAuthSession();
  const t = useTranslations();
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
          label={t("Dashboard.sideMenu.home")}
          component={Link}
          leftSection={<IconHome2 size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label={t("Dashboard.sideMenu.start_transaction")}
          component={Link}
          leftSection={<IconCashBanknote size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label={t("Dashboard.sideMenu.wallet")}
          component={Link}
          leftSection={<IconWallet size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label={t("Dashboard.sideMenu.transfer_status")}
          component={Link}
          leftSection={<IconCheck size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label={t("Dashboard.sideMenu.beneficiaries")}
          component={Link}
          leftSection={<IconUsers size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label={t("Dashboard.sideMenu.user_guide")}
          component={Link}
          leftSection={<IconInfoCircleFilled size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <NavLink
          label={t("Dashboard.sideMenu.contact_us")}
          component={Link}
          leftSection={<IconMail size="2rem" stroke={1.5} />}
          href={"/dashboard"}
        />
        <Flex columnGap={3} pt={50}>
          <User></User>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>
        <Flex align={"flex-end"} justify={"flex-end"} mt={20} gap="md">
          <Box miw={100}>
            <LocalSwitcher
              language={t("LocalSwitcher.fields.language_select")}
            />
          </Box>
          <form action={logOut}>
            <LogoutButton />
          </form>
        </Flex>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
