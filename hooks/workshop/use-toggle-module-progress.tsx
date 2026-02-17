"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleModuleProgress } from "@/services/workshop/toggle-module-progress";
import { toast } from "sonner";

export const useToggleModuleProgress = (workshopId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moduleId: string) => toggleModuleProgress(moduleId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["workshop-content", workshopId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-workshops"] });

      const message = data.data?.is_completed
        ? "Modul ditandai selesai!"
        : "Modul ditandai belum selesai.";
      toast.success(message);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Gagal mengubah status modul";
      toast.error(message);
    },
  });
};

export default useToggleModuleProgress;
