import getCourseTitle from "@/services/workshop/get-workshop-by-id";
import { useQuery } from "@tanstack/react-query";

const useGetCourseTitle = (courseId: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getCourseTitle(courseId),
    queryKey: ["course-title", courseId],
    staleTime: 60 * 1000 * 5, // 5 minutes
  });

  return {
    title: data?.data?.title,
    isLoading,
  };
};

export default useGetCourseTitle;
