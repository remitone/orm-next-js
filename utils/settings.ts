import { promises as fs } from "fs";

const getConfig = (name: string): string | null => {
  //const headersList = headers();
  //const appSettings = useContext(AppSettingContext);

  const domain = "";
  //const domain = headersList.get("REMITONE_DOMAIN");
  const configName = `${name}_${domain}`;
  // if (headersList.has(config)) {
  //     return headersList.get(config);
  // }
  return process.env[configName] ?? null;

  //const serverPublicKey = `SERVER_PUBLIC_KEY_${domain}`;
  //const primaryColour = `PRIMARY_COLOUR_${domain}`;
};

async function loadConfigsFromFile() {
  const configsFile = await fs.readFile(
    process.cwd() + "/lib/configs.json",
    "utf8",
  );
  const configs = JSON.parse(configsFile);

  return configs;
}

async function getTenantConfigs(domain: string, hostname: string) {
  const configs = await loadConfigsFromFile();

  const appSetting = configs[domain] as AppSetting;

  return { ...appSetting, domain, hostname };
}

export { getConfig, loadConfigsFromFile, getTenantConfigs };
