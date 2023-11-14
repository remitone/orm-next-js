"use client";

import React, { createContext } from "react";

const AppSettingsContext = createContext<AppSetting | null>(null);

const AppSettingProvider = ({
  children,
  appSettings,
}: {
  children: React.ReactNode;
  appSettings: AppSetting;
}) => {
  return (
    <AppSettingsContext.Provider value={appSettings}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export { AppSettingsContext, AppSettingProvider };
