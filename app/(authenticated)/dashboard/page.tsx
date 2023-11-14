import React, { Suspense } from "react";
import { Box, Text } from "@mantine/core";
import { headers } from "next/headers";
import ApiClient from "@/services/api/remitterws/client";
import { getTenantConfigs } from "@/utils/settings";
import TransactionList from "@/components/transaction-list";
import Loading from "@/app/(authenticated)/dashboard/loading";
import { TransactionListResponse } from "@/types/transaction";
import { getSession } from "@/services/authentication/CookieSession";
import { AuthSession } from "@/types/schema";

export async function getTransactionList(authSession: AuthSession) {
  const headersList = headers();
  const host = headersList.get("host")!;
  const hostname = headersList.get("hostname")!;
  const tenantConfigs = await getTenantConfigs(host, hostname);

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

  return (
    <Box>
      <Text size={"xl"} fw={"bold"}>
        Welcome {authSession && authSession.name ? authSession?.name : "...."}
      </Text>
      <Text pt={30} size={"lg"} fw={"bold"}>
        Transactions
      </Text>
      <Text>These are your recent transactions</Text>

      <Suspense fallback={<Loading />}>
        <TransactionList transactions={trans?.result?.transactions} />
      </Suspense>
    </Box>
  );
}
