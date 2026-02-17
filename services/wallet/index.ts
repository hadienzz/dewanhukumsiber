import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";
import {
  TransactionHistoryResponse,
  WalletInfoResponse,
} from "@/types/wallet.types";

export async function getTransactionHistory(): Promise<
  APIResponse<TransactionHistoryResponse>
> {
  const { data } = await axiosInstance.get<
    APIResponse<TransactionHistoryResponse>
  >("/api/wallets/transactions");
  return data;
}

export async function getMyWallet(): Promise<APIResponse<WalletInfoResponse>> {
  const { data } = await axiosInstance.get<APIResponse<WalletInfoResponse>>(
    "/api/wallets/me",
  );
  return data;
}
