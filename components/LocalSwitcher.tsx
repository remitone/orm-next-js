"use client";

import React, { useTransition } from "react";
import { Combobox, Input, InputBase, useCombobox, Text } from "@mantine/core";
import { usePathname, useRouter } from "@/lib/navigation";
import { locales } from "@/lib/localConfig";
import LocaleSwitcherFlag from "@/components/LocaleSwitcherFlag";
import { useTranslations } from "next-intl";

export default function LocalSwitcher({ language }: { language: string }) {
  //const t = useTranslations("LocaleSwitcher.fields");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    //const nextLocale = event.target.value;
    console.log("nextLocale", { nextLocale });
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  const options = locales.map((locale) => (
    <Combobox.Option value={locale} key={locale}>
      <Text>
        <LocaleSwitcherFlag locale={locale} /> &nbsp; {locale.toUpperCase()}
      </Text>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        onSelectChange(val);
        combobox.closeDropdown();
      }}
      disabled={isPending}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          <Input.Placeholder>{language}</Input.Placeholder>
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
