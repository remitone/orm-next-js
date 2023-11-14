import React from "react";
import { Box, Space, Text } from "@mantine/core";
import { headers } from "next/headers";
import { getTenantConfigs } from "@/utils/settings";
import ApiClient from "@/services/api/remitterws/client";
import { TransactionDetailsResponse } from "@/types/transaction-details";
import TransactionCard from "@/app/(authenticated)/transactions/TransactionCard";
import { getSession } from "@/services/authentication/CookieSession";

type TransactionProps = {
  params: {
    transRef: string;
  };
};

async function getTransaction(transRef: string) {
  const authSession = await getSession();
  const headersList = headers();
  const host = headersList.get("host")!;
  const hostname = headersList.get("hostname")!;
  const tenantConfigs = await getTenantConfigs(host, hostname);

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

export default async function Transaction({ params }: TransactionProps) {
  const transRef = params.transRef;
  // @ts-ignore
  //const { baseUrl } = useContext(AppSettingsContext);
  //const session = useAuthSession();
  // const { transaction, isLoading, isError } = useTransaction(
  //   baseUrl,
  //   session.username,
  //   session.sessionToken,
  //   transRef,
  // );
  const transactionDetailsResponse = await getTransaction(transRef);
  const transaction = transactionDetailsResponse?.result?.transaction;

  //   <Suspense fallback={<Loading />}>
  //
  //   </Suspense>
  // if (isError) {
  //   return (
  //     <Notification color="red" title="Error!" withCloseButton={false}>
  //       Failed to load the transaction {transRef} details. Try again!
  //     </Notification>
  //   );
  // }
  //
  // if (isLoading) {
  //   return (
  //     <Box pos={"absolute"} top={"50%"} left={"50%"} right={"auto"}>
  //       <Loader color="blue" />
  //     </Box>
  //   );
  // }

  return (
    <Box pos={"relative"}>
      <Text size={"xl"} fw={"bold"}>
        Transfer Details
      </Text>
      <Space pb={20}></Space>
      <TransactionCard transaction={transaction!} />
    </Box>
  );
}
