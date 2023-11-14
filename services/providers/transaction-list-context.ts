import { createContext } from "react";
import { Transactions } from "../../types/transaction";

export const TransactionListContext = createContext<Transactions | undefined>(
  undefined,
);
