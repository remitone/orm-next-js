"use client";

import React from "react";
import { Card } from "@mantine/core";
import { TransactionDetail } from "@/types/transaction-details";

export default function TransactionCard({
  transaction,
}: {
  transaction: TransactionDetail;
}) {
  return (
    <Card shadow="sm" radius="md" withBorder p={50}>
      <Card.Section>
        <h1>TransRef {transaction?.trans_ref}</h1>
        <h4>Status: {transaction?.status}</h4>
      </Card.Section>
    </Card>
  );
}
