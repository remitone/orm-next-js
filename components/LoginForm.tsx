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
import { useRouter } from "@/lib/navigation";
import { useContext, useState } from "react";
import LoginButton from "@/components/LoginButton";
import { z } from "zod";
import { AppSettingsContext } from "@/services/providers/app-settings-context";
import { useForm, zodResolver } from "@mantine/form";
import { LoginAction } from "@/actions/LoginAction";
import { useRemitterStore } from "@/services/store/RemitterStore";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Login");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [visible, { toggle }] = useDisclosure(false);

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

        console.log("Login Response", { loginActionResponse });
        //console.log("Remitter Response", loginActionResponse.remitter);
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
          {t("welcome_text")}
        </Text>
        <Text pt="5" c="grey" size="sm">
          {t("new_user_register_link_text")}
          <Anchor
            component={Link}
            href={"/signup"}
            size={"sm"}
            fw={"bold"}
            td={"underline"}
          >
            {" "}
            {t("sign_up_link_text")}
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
              label={t("fields.username")}
              placeholder={t("placeholders.username")}
              type="email"
              ta="left"
              mb="10"
              name="username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              placeholder={t("placeholders.password")}
              label={t("fields.password")}
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
            {t("fields.forgot_password")}
          </Anchor>
        </Box>
      </Container>
    </main>
  );
}
