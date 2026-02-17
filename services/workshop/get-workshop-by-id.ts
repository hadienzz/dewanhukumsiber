import axiosInstance from "@/lib/axios";

export interface GetWorkshopByIdResponse {
  status: string;
  message: string;
  data?: {
    title: string;
  };
}

const getCourseTitle = async (
  id: string,
): Promise<GetWorkshopByIdResponse> => {
  const { data } = await axiosInstance.get<GetWorkshopByIdResponse>(
    `/api/dashboard/${id}/title`,
  );

  return data;
};

export default getCourseTitle;
