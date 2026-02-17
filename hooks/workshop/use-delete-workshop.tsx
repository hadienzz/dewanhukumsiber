"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import deleteWorkshop from "@/services/workshop/delete-workshop";

const useDeleteWorkshop = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ["delete-workshop"],
		mutationFn: (workshopId: string) => deleteWorkshop(workshopId),
		onSuccess: (response, workshopId) => {
			toast.success(response.message || "Workshop berhasil dihapus");
			queryClient.invalidateQueries({ queryKey: ["workshops"] });
			queryClient.invalidateQueries({ queryKey: ["workshop-detail", workshopId] });
		},
		onError: () => {
			toast.error("Gagal menghapus workshop. Silakan coba lagi.");
		},
	});

	return {
		deleteWorkshop: mutate,
		isDeleting: isPending,
	};
};

export default useDeleteWorkshop;
