import axiosInstance from "@/lib/axios";

export interface CreateWorkshopPaymentResponse {
  status: string;
  message: string;
  data?: {
    order_id: string;
    transaction_token: string;
    idempotency_key: string;
  };
}

export type WorkshopPaymentMethod = "money" | "hybrid" | "credit";

export interface WorkshopCheckoutParams {
  workshop_id: string;
  payment_method: WorkshopPaymentMethod;
  credits_to_use?: number;
}

export const createWorkshopCheckout = async (
  params: WorkshopCheckoutParams,
): Promise<CreateWorkshopPaymentResponse> => {
  const idempotencyKey =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const { data } = await axiosInstance.post<CreateWorkshopPaymentResponse>(
    `/api/workshops/checkout`,
    {
      workshop_id: params.workshop_id,
      payment_method: params.payment_method,
      credits_to_use: params.credits_to_use ?? 0,
    },
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    },
  );

  return data;
};

export default createWorkshopCheckout;
