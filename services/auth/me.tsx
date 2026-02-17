import axiosInstance from "@/lib/axios";
import type { LoginUserApi } from "@/services/auth/login";

export interface MeResponse {
  status: string;
  message: string;
  data?: {
    user: LoginUserApi;
  };
}

export async function getCurrentUser(): Promise<LoginUserApi | null> {
  const { data } = await axiosInstance.get<MeResponse>("/api/auth/me");

  return data.data?.user ?? null;
}

export default getCurrentUser;
