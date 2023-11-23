import React from "react";
import TransactionCard from "@/app/[locale]/(authenticated)/transactions/TransactionCard";
import { getSession } from "@/services/authentication/CookieSession";
import { getTenantConfigs } from "@/utils/settings";
import ApiClient from "@/services/api/remitterws/client";
import { TransactionDetailsResponse } from "@/types/transaction-details";

async function getTransaction(transRef: string) {
  const authSession = await getSession();
  const tenantConfigs = await getTenantConfigs();

  const apiResponse = await ApiClient.post({
    url: `${tenantConfigs.baseUrl}/transaction/getTransaction`,
    body: {
      username: authSession?.username,
      session_token: authSession?.sessionToken,
      trans_ref: transRef,
    },
    options: {
      next: { tags: ["collection"] },
    },
  });

  return apiResponse.response as TransactionDetailsResponse;
}

export default async function TransDetails({ transRef }: { transRef: string }) {
  const transactionDetailsResponse = await getTransaction(transRef);
  const transaction = transactionDetailsResponse?.result?.transaction;

  return <TransactionCard transaction={transaction!} />;
}
