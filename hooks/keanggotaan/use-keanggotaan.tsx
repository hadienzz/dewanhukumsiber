import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getKeanggotaan,
  createKeanggotaan,
  updateKeanggotaan,
  deleteKeanggotaan,
} from "@/services/keanggotaan";

export const useKeanggotaan = () => {
  return useQuery({
    queryKey: ["keanggotaan"],
    queryFn: async () => {
      const response = await getKeanggotaan();
      return response.data ?? [];
    },
    staleTime: 5 * 1000,
  });
};

export const useCreateKeanggotaan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createKeanggotaan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keanggotaan"] });
    },
  });
};

export const useUpdateKeanggotaan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateKeanggotaan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keanggotaan"] });
    },
  });
};

export const useDeleteKeanggotaan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteKeanggotaan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keanggotaan"] });
    },
  });
};
