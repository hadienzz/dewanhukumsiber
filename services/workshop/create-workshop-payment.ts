import axiosInstance from "@/lib/axios";

export interface CreateWorkshopPaymentResponse {
  status: string;
  message: string;
  data?: {
    order_id: string;
    transaction_token: string;
    redirect_url: string;
    idempotency_key: string;
  };
}

export const createWorkshopPaymentRequest = async (
  workshopId: string,
): Promise<CreateWorkshopPaymentResponse> => {
  const idempotencyKey =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const { data } = await axiosInstance.post<CreateWorkshopPaymentResponse>(
    `/api/workshops/${workshopId}/checkout`,
    {},
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    },
  );

  return data;
};

export default createWorkshopPaymentRequest;
