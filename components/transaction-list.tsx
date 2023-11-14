import { Transactions } from "@/types/transaction";
import { Anchor, Box } from "@mantine/core";
import Link from "next/link";
import TransactionListItem from "@/components/transaction-list-item";

export default function TransactionList({
  transactions,
}: {
  transactions: Transactions | undefined;
}) {
  //console.log(transactions?.transaction);

  if (transactions?.transaction?.length) {
  }

  return (
    <Box mt={20}>
      {transactions?.transaction?.map((transaction) => {
        return (
          <Anchor
            key={transaction.trans_ref}
            component={Link}
            href={`/transactions/${transaction.trans_ref}`}
            underline="never"
            prefetch={true}
          >
            <TransactionListItem transaction={transaction} />
          </Anchor>
        );
      })}
    </Box>
  );
}
