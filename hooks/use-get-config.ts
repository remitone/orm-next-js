"use client";

import { useContext } from "react";
import { AppSettingsContext } from "../services/providers/app-settings-context";

export default function useGetConfig(name: string) {
  const appSettings = useContext(AppSettingsContext);
  const domain = appSettings;
  const configName = `${name}_${domain}`;

  return process.env[configName] ?? null;
}
