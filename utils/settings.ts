import { promises as fs } from "fs";
import { headers } from "next/headers";

async function loadConfigsFromFile() {
  const configsFile = await fs.readFile(
    process.cwd() + "/lib/configs.json",
    "utf8",
  );
  const configs = JSON.parse(configsFile);

  return configs;
}

async function getTenantConfigs() {
  const headersList = headers();
  let domain = headersList.get("x-forwarded-host") ?? "localhost:3000";
  let hostname = headersList.get("hostname") ?? "localhost";
  const configs = await loadConfigsFromFile();

  const appSetting = configs[domain] as AppSetting;

  return { ...appSetting, domain, hostname };
}

//const supportedLocals: string[] = ["en", "es", "si", "ar"];

export { loadConfigsFromFile, getTenantConfigs };
