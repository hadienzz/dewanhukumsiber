import { CourseDetail } from "@/components/dashboard/course-detail"
import { getCourseById } from "@/lib/courses-data"
import { notFound } from "next/navigation"

interface PreviewCoursePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PreviewCoursePage({ params }: PreviewCoursePageProps) {
  const { id } = await params
  const course = getCourseById(id)

  if (!course) {
    notFound()
  }

  return <CourseDetail course={course} isPreview />
}
