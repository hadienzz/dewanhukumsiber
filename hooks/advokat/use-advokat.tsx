import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdvokat,
  createAdvokat,
  updateAdvokat,
  deleteAdvokat,
} from "@/services/advokat";

export const useAdvokat = () => {
  return useQuery({
    queryKey: ["advokat"],
    queryFn: async () => {
      const response = await getAdvokat();
      return response.data ?? [];
    },
    staleTime: 5 * 1000,
  });
};

export const useCreateAdvokat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createAdvokat(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advokat"] });
    },
  });
};

export const useUpdateAdvokat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateAdvokat(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advokat"] });
    },
  });
};

export const useDeleteAdvokat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdvokat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advokat"] });
    },
  });
};
