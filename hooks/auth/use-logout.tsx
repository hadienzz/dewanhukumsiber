import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage } from "@/utils/error";
import { logoutRequest } from "@/services/auth/logout";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Berhasil logout");
      window.location.href = " /";
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error) => {
      const message = getErrorMessage(error, "Logout gagal");
      toast.error(message);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return {
    logout: handleLogout,
    isLoading: isPending,
  };
};

export default useLogout;
