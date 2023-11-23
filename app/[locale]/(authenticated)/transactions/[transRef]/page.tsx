import React, { Suspense } from "react";
import { Box, Space, Text } from "@mantine/core";
import Loading from "@/app/[locale]/(authenticated)/dashboard/loading";
import TransDetails from "@/app/[locale]/(authenticated)/transactions/[transRef]/TransDetails";

type TransactionProps = {
  params: {
    transRef: string;
  };
};

export default async function Transaction({ params }: TransactionProps) {
  const transRef = params.transRef;

  return (
    <Box pos={"relative"}>
      <Text size={"xl"} fw={"bold"}>
        Transfer Details
      </Text>
      <Space pb={20}></Space>
      <Suspense fallback={<Loading />}>
        <TransDetails transRef={transRef} />
      </Suspense>
    </Box>
  );
}
