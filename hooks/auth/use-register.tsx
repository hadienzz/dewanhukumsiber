import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage } from "@/utils/error";
import { registerRequest } from "@/services/auth/register";
import { RegisterUserPayload } from "@/types/types";
import { registerSchema } from "@/features/schema/auth.schema";

const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: async (data) => {
      toast.success(data.message || "Registrasi berhasil");
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.push("/verify-email");
    },
    onError: (error) => {
      const message = getErrorMessage(error, "Registrasi gagal");
      toast.error(message);
    },
  });

  const formik = useFormik<RegisterUserPayload>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    } as RegisterUserPayload,
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema: registerSchema,
    validateOnMount: true,
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const registerIsDisabled = !formik.isValid || isPending || !formik.dirty;

  return {
    formik,
    toggleShowPassword,
    showPassword,
    isLoading: isPending,
    registerIsDisabled,
  };
};

export default useRegister;
