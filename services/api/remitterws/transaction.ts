import ApiClient from "./client";
import { TransactionListResponse } from "@/types/transaction";
import { TransactionDetailsResponse } from "@/types/transaction-details";
import useSWR from "swr";

const useTransactionList = (
  baseUrl: string,
  username: string,
  sessionToken: string,
) => {
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/transaction/listTransactions`,
    (url) =>
      ApiClient.post({
        url,
        body: { username: username, session_token: sessionToken },
      }).then((transResult) => transResult.response as TransactionListResponse),
  );

  return {
    transactions: data?.result?.transactions,
    isLoading,
    isError: error,
  };
};

const useTransaction = (
  baseUrl: string,
  username: string,
  sessionToken: string,
  transRef: string,
) => {
  const params = {
    trans_ref: transRef,
  };

  const { data, error, isLoading } = useSWR(
    [`${baseUrl}/transaction/getTransaction`, params],
    ([url, params]) =>
      ApiClient.post({
        url: url,
        body: { username: username, session_token: sessionToken },
      }).then((res) => res.response as TransactionDetailsResponse),
  );

  return {
    transaction: data?.result?.transaction,
    isLoading,
    isError: error,
  };
};

export { useTransactionList, useTransaction };
