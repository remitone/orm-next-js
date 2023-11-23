import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "@/lib/localConfig";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: locales });
