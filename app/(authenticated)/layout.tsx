import React from "react";
import DashboardLayoutWrapper from "@/components/ui/DashboardLayoutWrapper";
import { getSession } from "@/services/authentication/CookieSession";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.sessionToken == null) {
    redirect("/");
  }

  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
