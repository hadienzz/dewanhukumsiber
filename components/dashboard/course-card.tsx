"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Course } from "@/lib/courses-data"
import { BookOpen, Clock, Eye, Pencil, Trash2, Users } from "lucide-react"
import Link from "next/link"

interface CourseCardProps {
  course: Course
  onDelete?: (id: string) => void
}

export function CourseCard({ course, onDelete }: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-green-100 text-green-700 hover:bg-green-100",
    Intermediate: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    Advanced: "bg-red-100 text-red-700 hover:bg-red-100",
  }

  const statusColors = {
    Draft: "bg-slate-100 text-slate-700 hover:bg-slate-100",
    Published: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  }

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-40 bg-gradient-to-br from-slate-700 to-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-white/20" />
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={statusColors[course.status]}>{course.status}</Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className={levelColors[course.level]}>{course.level}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {course.category}
          </Badge>
        </div>
        <h3 className="mb-2 line-clamp-2 font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-slate-600">
          {course.shortDescription}
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.totalModules} Modul</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.estimatedDuration}</span>
          </div>
        </div>
        {course.enrolledStudents !== undefined && course.enrolledStudents > 0 && (
          <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
            <Users className="h-4 w-4" />
            <span>{course.enrolledStudents.toLocaleString()} peserta</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-slate-50 p-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-medium text-slate-700">
              {course.author.name.split(" ")[0][0]}
              {course.author.name.split(" ")[1]?.[0] || ""}
            </div>
            <span className="text-xs text-slate-600 line-clamp-1 max-w-[100px]">
              {course.author.name.split(",")[0]}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Link href={`/dashboard/courses/${course.id}/preview`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/dashboard/courses/${course.id}/edit`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete?.(course.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
