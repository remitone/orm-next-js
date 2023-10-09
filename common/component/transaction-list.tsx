"use client";

import React from "react";
import { Transactions } from "../../types/transaction";
import { Anchor, Box } from "@mantine/core";
import Link from "next/link";
import TransactionListItem from "./transaction-list-item";

export default function TransactionList({
  transactions,
}: {
  transactions: Transactions | undefined;
}) {
  return (
    <Box mt={20}>
      {transactions?.transaction?.map((transaction) => {
        return (
          <Anchor
            key={transaction.trans_ref}
            component={Link}
            href={`/transactions/${transaction.trans_ref}`}
            underline="never"
          >
            <TransactionListItem transaction={transaction} />
          </Anchor>
        );
      })}
    </Box>
  );
}
