"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { sendVerificationCode, verifyEmailCode } from "@/services/auth/verify";
import { getErrorMessage } from "@/utils/error";

const RESEND_COOLDOWN = 60; // seconds

const useVerification = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Submit verification code
  const verifyMutation = useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: () => {
      toast.success("Email berhasil diverifikasi!");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.push("/");
    },
    onError: (error) => {
      const message = getErrorMessage(error, "Verifikasi gagal");
      toast.error(message);
    },
  });

  // Resend code
  const resendMutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      toast.success("Kode verifikasi baru telah dikirim");
      setCooldown(RESEND_COOLDOWN);
      setCode(Array(6).fill(""));
    },
    onError: (error) => {
      const message = getErrorMessage(error, "Gagal mengirim ulang kode");
      toast.error(message);
    },
  });

  const handleCodeChange = useCallback(
    (index: number, value: string) => {
      // Only allow digits
      if (value && !/^\d$/.test(value)) return;

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    },
    [code],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    },
    [code],
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setCode(pastedData.split(""));
      const lastInput = document.getElementById("otp-5");
      lastInput?.focus();
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      toast.error("Masukkan 6 digit kode verifikasi");
      return;
    }
    verifyMutation.mutate(fullCode);
  }, [code, verifyMutation]);

  const handleResend = useCallback(() => {
    if (cooldown > 0) return;
    resendMutation.mutate();
  }, [cooldown, resendMutation]);

  return {
    code,
    cooldown,
    isVerifying: verifyMutation.isPending,
    isResending: resendMutation.isPending,
    handleCodeChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,
  };
};

export default useVerification;
