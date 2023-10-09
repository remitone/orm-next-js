export interface RemitterResponse extends BaseResponse {
  result?: RemitterResult;
}

export interface RemitterResult {
  remitter?: Remitter;
}

export interface Remitter {
  remitter_id?: string;
  status?: string;
  trans_allowed?: string;
  local_name?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  gender?: string;
  avatar?: string;
  avatar_content?: string;
  street?: string;
  building_no?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_id?: string;
  country_iso_code?: string;
  telephone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  dob?: Date;
  place_of_birth?: string;
  country_of_birth?: string;
  nationality?: string;
  temp_member?: string;
  fathers_name?: string;
  mothers_name?: string;
  national_id_number?: string;
  verified?: string;
  receive_marketing?: string;
  language?: string;
  id_documents?: IDDocuments;
  kyc_video?: string;
  occupation?: string;
  purpose?: string;
  source_of_income?: string;
  account_number?: string;
  annual_income?: string;
  annual_remittance?: string;
  sort_code?: string;
  type?: string;
  employer?: string;
  business_address?: string;
  business_type?: string;
  contract_date?: string;
  orgtype?: string;
  hear_about_us?: string;
  hear_about_us_other?: string;
  cpf_number?: string;
  taxpayer_reg?: string;
  card_issue_date?: string;
  default_transfer_purpose?: string;
  groups?: string;
  creation_date?: string;
  awaiting_merge?: string;
  loyalty_points?: string;
  custom1?: string;
  custom2?: string;
  custom3?: string;
}

export interface IDDocuments {
  id_document?: IDDocument[];
}

export interface IDDocument {
  id_type?: string;
  id_details?: string;
  id_issued_by?: string;
  id_issue_place?: string;
  id_issue_country?: string;
  id_start?: string;
  id_expiry?: string;
  id_verified?: string;
  id_scan1?: string;
  id_scan1_content?: string;
  id_scan2?: string;
  id_scan2_content?: string;
  id_scan3?: string;
  id_scan3_content?: string;
}
