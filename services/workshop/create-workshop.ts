import axiosInstance from "@/lib/axios";
import { CreateWorkshopRequestPayload } from "@/types/types";

export interface CreateWorkshopResponse {
  status: string;
  message: string;
  data?: {
    workshop_id: string;
  };
}

const convertToFormData = (payload: CreateWorkshopRequestPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("short_description", payload.short_description);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append("price", String(payload.price));
  formData.append("credit_price", String(payload.credit_price));

  (payload.benefits || []).forEach((benefit) => {
    formData.append("benefits", benefit);
  });

  if (payload.thumbnail) {
    formData.append("thumbnail", payload.thumbnail);
  }
  return formData;
};

export const createWorkshopRequest = async (
  payload: CreateWorkshopRequestPayload,
): Promise<CreateWorkshopResponse> => {
  const formData = convertToFormData(payload);

  const { data } = await axiosInstance.post<CreateWorkshopResponse>(
    "/api/dashboard/create-workshop",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export default createWorkshopRequest;
