"use client";

import { CourseDetail } from "@/components/dashboard/course-detail";
import useGetWorkshopDetail from "@/hooks/workshop/use-get-workshop-detail";
import { getCourseById } from "@/lib/courses-data";
import { notFound, useParams } from "next/navigation";

const PreviewCoursePage = () => {
  const { id } = useParams();
  // const course = getCourseById(id as string);
  const { isLoading, workshop, workshopNotFound } = useGetWorkshopDetail(
    id as string,
  );
  console.log(workshop);
  if (workshopNotFound) {
    notFound();
  }

  return <>baru testing ajah</>;
  // return <CourseDetail course={workshop} isPreview />;
};

export default PreviewCoursePage;
