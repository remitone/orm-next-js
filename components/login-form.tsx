"use client";

import {
  Anchor,
  Box,
  Container,
  Group,
  Notification,
  PasswordInput,
  rem,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import LoginButton from "@/components/LoginButton";
import { z } from "zod";
import { AppSettingsContext } from "@/services/providers/app-settings-context";
import { useForm, zodResolver } from "@mantine/form";
import { LoginAction } from "@/actions/LoginAction";

const LoginFormSchema = z.object({
  username: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message:
        "Your password must contain minimum 8 characters and one digit and special character",
    }),
});

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [visible, { toggle }] = useDisclosure(false);

  //const { login } = useContext(AuthContext);
  const appSettings = useContext(AppSettingsContext);
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const form = useForm({
    validate: zodResolver(LoginFormSchema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  async function handleLoginSubmit(formData: FormData) {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      const loginData: LoginData = {
        username: form.values.username,
        password: form.values.password,
      };

      try {
        // @ts-ignore
        const loginActionResponse = await LoginAction(appSettings!, loginData);

        if (loginActionResponse?.success) {
          router.push("/dashboard");
        }

        if (loginActionResponse?.error) {
          setError(loginActionResponse?.message!);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  }

  return (
    <main>
      <Container p={"20px"} mt={20} ta={"center"} pos="relative">
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
          <form action={handleLoginSubmit}>
            <TextInput
              withAsterisk
              label="Your email address"
              placeholder="your@email.com"
              type="email"
              ta="left"
              mb="10"
              name="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              placeholder="secret"
              label="Password"
              visible={visible}
              min="8"
              ta="left"
              name="password"
              {...form.getInputProps("password")}
              onVisibilityChange={toggle}
              required
            />

            <Group justify="flex-end" mt="md">
              <LoginButton />
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
