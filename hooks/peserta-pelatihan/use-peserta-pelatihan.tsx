import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPesertaPelatihan,
  getPesertaPelatihanPaginated,
  createPesertaPelatihan,
  deletePesertaPelatihan,
} from "@/services/peserta-pelatihan";

export const usePesertaPelatihan = () => {
  return useQuery({
    queryKey: ["peserta-pelatihan"],
    queryFn: async () => {
      const response = await getPesertaPelatihan();
      return response.data ?? [];
    },
    staleTime: 5 * 1000,
  });
};

export const usePesertaPelatihanPaginated = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["peserta-pelatihan", "paginated", page, limit],
    queryFn: async () => {
      const response = await getPesertaPelatihanPaginated(page, limit);
      return { data: response.data ?? [], meta: response.meta! };
    },
    staleTime: 5 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useCreatePesertaPelatihan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      nama_lengkap: string;
      email: string;
      nama_pelatihan: string;
    }) => createPesertaPelatihan(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["peserta-pelatihan"] });
    },
  });
};

export const useDeletePesertaPelatihan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePesertaPelatihan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["peserta-pelatihan"] });
    },
  });
};
