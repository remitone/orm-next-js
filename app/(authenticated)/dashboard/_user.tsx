"use client";

import React from "react";
import {
  Avatar,
  Box,
  Group,
  rem,
  Text,
  UnstyledButton,
  useDirection,
  useMantineTheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useAuthSession } from "@/hooks/useSession";

export default function User() {
  const session = useAuthSession();
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const { dir } = useDirection();
  return (
    <Box
      style={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        style={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
          <Box style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {session && session.name ? session?.name : "...."}
            </Text>
            <Text c="dimmed" size="xs">
              {session && session.username ? session?.username : ""}
            </Text>
          </Box>

          {/*{dir === "ltr" ? (*/}
          {/*  <IconChevronRight size={rem(1.5)} />*/}
          {/*) : (*/}
          {/*  <IconChevronLeft size={rem(1.5)} />*/}
          {/*)}*/}
        </Group>
      </UnstyledButton>
    </Box>
  );
}
