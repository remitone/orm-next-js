"use client";

import React, { useContext } from "react";
import { Box, Text } from "@mantine/core";
import { AuthContext } from "../../../common/context/authentication-context";
import { useTransactionList } from "../../../common/api/transaction";
import TransactionList from "../../../common/component/transaction-list";
import Loading from "./loading";
import { TransactionListContext } from "../../../common/context/transaction-list-context";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { authenticatedUser, isLoggedIn } = useContext(AuthContext);
  const { transactions, isLoading, isError } = useTransactionList();

  console.log("Authenticated User", authenticatedUser);

  return (
    <Box>
      <Text size={"xl"} fw={"bold"}>
        Welcome{" "}
        {authenticatedUser === null ? "..." : authenticatedUser?.firstname}
      </Text>
      <Text pt={30} size={"lg"} fw={"bold"}>
        Transactions
      </Text>
      <Text>These are your recent transactions</Text>

      {isLoading ? (
        <Loading />
      ) : (
        <TransactionListContext.Provider value={transactions}>
          <TransactionList transactions={transactions} />
        </TransactionListContext.Provider>
      )}
    </Box>
  );
}
