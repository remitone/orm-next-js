import React, { Suspense } from "react";
import { Box, Text } from "@mantine/core";
import ApiClient from "@/services/api/remitterws/client";
import { getTenantConfigs } from "@/utils/settings";
import TransactionList from "@/components/transaction-list";
import Loading from "@/app/[locale]/(authenticated)/dashboard/loading";
import { TransactionListResponse } from "@/types/transaction";
import { getSession } from "@/services/authentication/CookieSession";
import RemitterWelcomeTitle from "./_components/RemitterWelcomeTitle";
import { getMessages, getTranslations } from "next-intl/server";

async function getTransactionList(authSession: AuthSession) {
  const tenantConfigs = await getTenantConfigs();

  const apiResponse = await ApiClient.post({
    url: `${tenantConfigs.baseUrl}/transaction/listTransactions`,
    body: {
      username: authSession?.username,
      session_token: authSession?.sessionToken,
    },
  });

  return apiResponse.response as TransactionListResponse;
}

export default async function Dashboard() {
  const authSession = await getSession();
  const trans = await getTransactionList(authSession!);
  const t = await getTranslations("Dashboard");

  return (
    <Box>
      <RemitterWelcomeTitle />
      <Text pt={30} size={"lg"} fw={"bold"}>
        {t("page.recent_transaction_title")}
      </Text>
      <Text> {t("page.recent_transaction_description")}</Text>

      <Suspense fallback={<Loading />}>
        <TransactionList transactions={trans?.result?.transactions} />
      </Suspense>
    </Box>
  );
}
