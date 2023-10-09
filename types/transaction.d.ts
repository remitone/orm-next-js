import { R1Boolean } from "./global";

export interface TransactionListResponse extends BaseResponse {
  result?: TransactionListResult;
}

export interface TransactionListResult {
  transactions?: Transactions;
}

export interface Transactions {
  transaction?: Transaction[];
}

export interface Transaction {
  trans_ref?: string;
  trans_type?: TransType;
  status?: Status;
  creation_date?: string;
  processed_date?: Date;
  originating_country?: string;
  destination_country?: string;
  source_currency?: string;
  source_amount?: string;
  dest_currency?: string;
  dest_amount?: string;
  payment_method?: string;
  benef_id?: string;
  benef_name?: string;
  benef_mobile?: string;
  compliance_needed?: R1Boolean;
  compliance_checked?: R1Boolean;
  ext_compliance_needed?: R1Boolean;
  ext_compliance_checked?: R1Boolean;
}

export type Status =
  | "AGENT_OK"
  | "PROCESSED"
  | "PENDING_CLEARANCE"
  | "SENT_FOR_PAY"
  | "HQ_OK";

export type TransType = "Card Transfer" | "Utility Bill" | "Account";
