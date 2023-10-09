import React from "react";
import { Box, Card, Loader, Notification, Space, Text } from "@mantine/core";
import { useTransaction } from "../../../../common/api/transaction";

type TransactionProps = {
  params: {
    transRef: string;
  };
};

export default function Transaction({ params }: TransactionProps) {
  const transRef = params.transRef;
  const { transaction, isLoading, isError } = useTransaction(transRef);

  if (isError) {
    return (
      <Notification color="red" title="Error!" withCloseButton={false}>
        Failed to load the transaction {transRef} details. Try again!
      </Notification>
    );
  }

  if (isLoading) {
    return (
      <Box pos={"absolute"} top={"50%"} left={"50%"} right={"auto"}>
        <Loader color="blue" />
      </Box>
    );
  }

  return (
    <Box pos={"relative"}>
      <Text size={"xl"} fw={"bold"}>
        Transfer Details
      </Text>
      <Space pb={20}></Space>
      <Card shadow="sm" radius="md" withBorder p={50}>
        <Card.Section>
          <h1>TransRef {transaction?.trans_ref}</h1>
          <h4>Status: {transaction?.status}</h4>
        </Card.Section>
      </Card>
    </Box>
  );
}
