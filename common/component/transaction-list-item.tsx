"use client";

import React from "react";
import { Transaction } from "../../types/transaction";
import { Box, Flex, Grid, Text } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

export default function TransactionListItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <Box pt={20} pb={20}>
      <Grid>
        <Grid.Col span="content">
          <IconSend
            stroke={2}
            size="2rem"
            color="var(--mantine-color-blue-filled)"
          ></IconSend>
        </Grid.Col>
        <Grid.Col span={3}>
          <Flex
            direction={"column"}
            style={{
              color: "var(--mantine-color-dark-4)",
            }}
          >
            <Text fw={"bold"}>{transaction.benef_name}</Text>
            <Text size={"sm"} c={"gray"}>
              Sent - {transaction.creation_date}
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span="content" offset={3}>
          <Flex
            direction={"column"}
            justify={"flex-end"}
            align={"flex-end"}
            style={{
              color: "var(--mantine-color-dark-4)",
            }}
          >
            <Text fw={"bold"}>
              {transaction.dest_amount} {transaction.dest_currency}
            </Text>
            <Text size={"sm"} c={"gray"}>
              {transaction.source_amount} {transaction.source_currency}
            </Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
