"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { loginSchema } from "@/features/schema/auth.schema";
import { loginRequest } from "@/services/auth/login";
import { LoginUserPayload } from "@/types/types";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });

      // Check if user is verified
      const user = data.data;
      if (user && !user.is_verified) {
        router.push("/verify-email");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      const message = getErrorMessage(error, "Login gagal");

      toast.error(message);
    },
  });

  const formik = useFormik<LoginUserPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      mutate(values);
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    formik,
    showPassword,
    toggleShowPassword,
    isLoading: isPending,
  };
};

export default useLogin;
