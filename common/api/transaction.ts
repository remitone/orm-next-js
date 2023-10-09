import axios from "../utils/remitterws-api-client";
import { TransactionListResponse } from "../../types/transaction";
import { TransactionDetailsResponse } from "../../types/transaction-details";
import useSWR from "swr";

const useTransactionList = () => {
  const { data, error, isLoading } = useSWR(
    "/transaction/listTransactions",
    (url) =>
      axios
        .post(url)
        .then((res) => res.data.response as TransactionListResponse),
  );

  return {
    transactions: data?.result?.transactions,
    isLoading,
    isError: error,
  };
};

const useTransaction = (transRef: string) => {
  const params = {
    trans_ref: transRef,
  };

  const { data, error, isLoading } = useSWR(
    ["/transaction/getTransaction", params],
    ([url, params]) =>
      axios
        .post(url, params)
        .then((res) => res.data.response as TransactionDetailsResponse),
  );

  return {
    transaction: data?.result?.transaction,
    isLoading,
    isError: error,
  };
};

export { useTransactionList, useTransaction };
