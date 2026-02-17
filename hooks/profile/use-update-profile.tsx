"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import updateProfile, {
  type UpdateProfilePayload,
} from "@/services/profile/update-profile";
import { getErrorMessage } from "@/utils/error";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal memperbarui profil"));
    },
  });

  return {
    updateProfile: mutate,
    isLoading: isPending,
    isEditing,
    setIsEditing,
  };
};

export default useUpdateProfile;
