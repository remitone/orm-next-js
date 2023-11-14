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
  let origin = headersList.get("origin")!;
  let domain = headersList.get("host") ?? "localhost:3000";
  let hostname = headersList.get("hostname") ?? "localhost";
  if (origin != null) {
    const url = new URL(origin);
    domain = url.host;
    hostname = url.hostname;
  }

  const configs = await loadConfigsFromFile();

  const appSetting = configs[domain] as AppSetting;

  return { ...appSetting, domain, hostname };
}

export { loadConfigsFromFile, getTenantConfigs };
