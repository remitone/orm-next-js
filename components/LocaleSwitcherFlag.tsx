import React from "react";
import { ES, GB, LK, SA, US } from "country-flag-icons/react/3x2";

export default function LocaleSwitcherFlag({ locale }: { locale: string }) {
  switch (locale) {
    case "en-US":
      return <US lang={locale} width={20} />;
    case "en":
      return <GB lang={locale} width={20} />;
    case "es":
      return <ES lang={locale} width={20} />;
    case "si":
      return <LK lang={locale} width={20} />;
    case "ar":
      return <SA lang={locale} width={20} />;
  }
}
