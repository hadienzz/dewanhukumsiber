import axiosInstance from "@/lib/axios";

export interface VerifyEmailResponse {
  status: string;
  message: string;
}

export async function sendVerificationCode(): Promise<VerifyEmailResponse> {
  const { data } = await axiosInstance.post<VerifyEmailResponse>(
    "/api/auth/send-verification",
  );
  return data;
}

export async function verifyEmailCode(
  code: string,
): Promise<VerifyEmailResponse> {
  const { data } = await axiosInstance.post<VerifyEmailResponse>(
    "/api/auth/verify-email",
    { code },
  );
  return data;
}
