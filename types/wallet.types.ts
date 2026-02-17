export type TransactionType =
  | "TOPUP"
  | "PURCHASE_WORKSHOP"
  | "CALCULATOR_USAGE"
  | "REFUND"
  | "ADJUSTMENT";

export interface CreditTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string | null;
  valid_until: string | null;
  created_at: string;
  reference_id: string | null;
}

export interface TransactionHistoryResponse {
  active_balance: number;
  transactions: CreditTransaction[];
}

export interface WalletInfoResponse {
  total_balance: number;
  active_balance: number;
}
