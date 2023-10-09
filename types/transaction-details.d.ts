export interface TransactionDetailsResponse extends BaseResponse {
  result?: TransactionDetailResult;
}

export interface TransactionDetailResult {
  transaction?: TransactionDetail;
}

export interface TransactionDetail {
  trans_ref?: string;
  agent_trans_ref?: string;
  benef_trans_ref?: string;
  status?: string;
  creation_date?: string;
  purpose?: string;
  source_of_income?: string;
  processing_bank?: string;
  bank_accept_date?: string;
  bank_branch_accept_date?: string;
  delivery_date?: string;
  processed_date?: string;
  processed_by?: string;
  payment_gateway_acknowledged?: string;
  trans_type?: string;
  benef_id?: string;
  benef_name?: string;
  benef_tel?: string;
  benef_mobile?: string;
  benef_email?: string;
  benef_id_type?: string;
  benef_id_detail?: string;
  comments_to_beneficiary?: string;
  collection_point?: string;
  collection_point_id?: string;
  collection_point_bank?: string;
  collection_point_code?: string;
  collection_point_address?: string;
  collection_point_city?: string;
  collection_point_state?: string;
  collection_pin?: string;
  benef_bank_account_number?: string;
  benef_bank_account_type?: string;
  benef_bank_account_name?: string;
  benef_bank?: string;
  benef_bank_city?: string;
  benef_bank_state?: string;
  benef_bank_iban?: string;
  benef_bank_swift_code?: string;
  benef_bank_bsb_code?: string;
  benef_bank_ifsc_code?: string;
  benef_bank_routing_transit_number?: string;
  benef_branch?: string;
  benef_branch_code?: string;
  benef_branch_telephone?: string;
  benef_branch_manager?: string;
  additional_benef_bank?: string;
  additional_benef_bank_branch?: string;
  benef_card_type?: string;
  benef_card_number?: string;
  benef_address1?: string;
  benef_address2?: string;
  benef_address3?: string;
  benef_city?: string;
  benef_state?: string;
  benef_postcode?: string;
  benef_mobiletransfer_number?: string;
  benef_mobiletransfer_network?: string;
  benef_mobiletransfer_network_credit_type?: string;
  remitt_benef_relation?: string;
  delivery_notes?: string;
  utilitybill_company?: string;
  utilitybill_account_no?: string;
  utilitybill_invoice?: string;
  utilitybill_address1?: string;
  utilitybill_address2?: string;
  utilitybill_address3?: string;
  utilitybill_city?: string;
  utilitybill_state?: string;
  utilitybill_postcode?: string;
  utilitybill_bank?: string;
  utilitybill_bank_code?: string;
  utilitybill_bank_bic?: string;
  utilitybill_description?: string;
  payment_method?: string;
  payment_method_name?: string;
  payment_token?: string;
  send_country?: string;
  send_currency?: string;
  send_amount?: string;
  rate?: string;
  commission?: string;
  commission_before_promotion?: string;
  promotion_names?: string;
  promotion_ids?: string;
  loyalty_points_used?: string;
  loyalty_points_discount?: string;
  loyalty_points_earned?: string;
  service_level?: string;
  service_level_name?: string;
  fees?: string;
  tax?: string;
  total_charges?: string;
  remitter_pay?: string;
  receive_country?: string;
  receive_currency?: string;
  receive_amount?: string;
  bank_sequence?: string;
  pay_method?: string;
  issue_date?: string;
  bank_ref?: string;
  bank_comments?: string;
  bank_credit_date?: string;
  bank_clear_date?: string;
  status_changed_date?: string;
}