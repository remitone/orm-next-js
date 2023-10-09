"use client";

import { useContext, useState } from "react";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Notification,
  PasswordInput,
  rem,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import AuthenticationError from "../common/error/AuthenticationError";
import { AuthContext } from "../common/context/authentication-context";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const [visible, { toggle }] = useDisclosure(false);
  const { login } = useContext(AuthContext);

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        passwordRegex.test(value)
          ? null
          : "Your password must contain minimum 8 characters and one digit and special character",
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setIsLoading(true);

    try {
      const loginData: LoginData = {
        username: values.email,
        password: values.password,
      };

      const loggedIn = await login(loginData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error instanceof AuthenticationError) {
        setError("Invalid Credentials");
      }
      if (error instanceof Error) {
        setError(error.message);
      }

      setIsLoading(false);
    }
  }

  return (
    <main>
      <Container p={"20px"} mt={20} ta={"center"} pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Text size="xl" fw={"bold"}>
          Welcome back.
        </Text>
        <Text pt="5" c="grey" size="sm">
          New to RemitONE?
          <Anchor
            component={Link}
            href={"/signup"}
            size={"sm"}
            fw={"bold"}
            td={"underline"}
          >
            {" "}
            Sign Up
          </Anchor>
        </Text>

        <Box mt={20} maw={340} mx={"auto"}>
          {error != null && (
            <Notification
              withCloseButton={false}
              color="red"
              title="Eror!"
              ta="left"
              mb="20"
            >
              {error}
            </Notification>
          )}
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label="Your email address"
              placeholder="your@email.com"
              type="email"
              ta="left"
              mb="10"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              placeholder="secret"
              label="Password"
              visible={visible}
              min="8"
              ta="left"
              {...form.getInputProps("password")}
              onVisibilityChange={toggle}
            />

            <Group justify="flex-end" mt="md">
              <Button fullWidth type="submit" radius="xl">
                Login
              </Button>
            </Group>
          </form>

          <Anchor
            component={Link}
            href={"/reset"}
            td="underline"
            size="md"
            fw="bold"
            pt="20"
            display="block"
            ta="left"
          >
            Trouble Logging in?
          </Anchor>
        </Box>
      </Container>
    </main>
  );
}
