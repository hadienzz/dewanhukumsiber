import axiosInstance from "@/lib/axios";
import { PaymentPayload } from "@/types/payment.type";

export interface CreatePaymentResponse {
  status: string;
  message: string;
  data?: {
    order_id: string;
    transaction_token: string;
    idempotency_key: string;
  };
}

const createPayment = async (
  payload: PaymentPayload,
  idempotencyKey: string,
): Promise<CreatePaymentResponse> => {
  const { data } = await axiosInstance.post<CreatePaymentResponse>(
    "/api/payments/create-payment",
    payload,
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    },
  );

  return data;
};

export default createPayment;
