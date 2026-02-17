import axiosInstance from "@/lib/axios";
import { LoginUserPayload } from "@/types/types";

export interface LoginUserApi {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data?: LoginUserApi;
}

export async function loginRequest(
  payload: LoginUserPayload,
): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/api/auth/login",
    payload,
  );

  return data;
}

export default loginRequest;
