import { CourseForm } from "@/components/dashboard/workshop-form"
import { getCourseById } from "@/lib/courses-data"
import { notFound } from "next/navigation"

interface EditCoursePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params
  const course = getCourseById(id)

  if (!course) {
    notFound()
  }

  return <CourseForm course={course} mode="edit" />
}
