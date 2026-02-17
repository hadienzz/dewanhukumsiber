"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteWorkshopModule from "@/services/workshop/delete-workshop-module";
import { toast } from "sonner";

const useDeleteWorkshopModule = (workshopId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-workshop-module", workshopId],
    mutationFn: (moduleId: string) =>
      deleteWorkshopModule(workshopId as string, moduleId),
    onSuccess: (response) => {
      toast.success(response.message || "Modul berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["workshop-detail", workshopId],
      });
    },
    onError: () => {
      toast.error("Gagal menghapus modul. Silakan coba lagi.");
    },
  });

  return {
    deleteModule: mutate,
    isDeleting: isPending,
  };
};

export default useDeleteWorkshopModule;
