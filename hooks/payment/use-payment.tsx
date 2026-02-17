import createPayment from "@/services/payment/create-payment";
import { PaymentPayload } from "@/types/payment.type";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    snap: any;
  }
}

const usePayment = () => {
  const idempotencyByPackageRef = useRef<Map<string, string>>(new Map());

  const generateIdempotencyKey = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };

  const getIdempotencyKeyForPackage = (packageId: string) => {
    const existing = idempotencyByPackageRef.current.get(packageId);
    if (existing) return existing;
    const created = generateIdempotencyKey();
    idempotencyByPackageRef.current.set(packageId, created);
    return created;
  };

  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (input: { payload: PaymentPayload; idempotencyKey: string }) =>
      createPayment(input.payload, input.idempotencyKey),
    mutationKey: ["create-payment"],
    onError: () => {
      toast.error("Gagal memproses pembayaran workshop.");
    },
  });

  const handleCreatePayment = async (payload: PaymentPayload) => {
    try {
      const idempotencyKey = getIdempotencyKeyForPackage(payload.package_id);
      const { data } = await mutateAsync({ payload, idempotencyKey });

      if (data?.transaction_token) {
        window.snap.pay(data.transaction_token, {
          onSuccess: () => {
            toast.success("Pembayaran berhasil!");
            idempotencyByPackageRef.current.delete(payload.package_id);
          },
          onPending: () => {
            toast.info("Pembayaran menunggu konfirmasi.");
          },
          onError: () => {
            toast.error("Pembayaran gagal.");
          },
          onClose: () => {
            toast.error(
              "Anda menutup popup pembayaran tanpa menyelesaikan pembayaran.",
            );
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  return {
    handleCreatePayment,
    isPaymentError: isError,
    isPending,
  };
};

export default usePayment;
