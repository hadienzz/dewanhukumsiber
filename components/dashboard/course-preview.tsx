"use client";

import { Course } from "@/lib/courses-data";
import { getParticipantsByCourseId } from "@/lib/participants-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuthorSection } from "@/components/dashboard/author-section";
import { ParticipantList } from "@/components/dashboard/participant-list";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Globe,
  GraduationCap,
  Layers,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

interface CoursePreviewProps {
  course: Course;
}

export function CoursePreview({ course }: CoursePreviewProps) {
  const participants = getParticipantsByCourseId(course.id);

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Back Button */}
          <Link
            href="/dashboard/courses"
            className="mb-6 inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Kursus
          </Link>

          {/* Preview Badge */}
          <div className="mb-4">
            <Badge className="bg-amber-500 text-white hover:bg-amber-500">
              Mode Preview
            </Badge>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="border-slate-500 text-slate-300"
                >
                  {course.category}
                </Badge>
                <Badge className={levelColors[course.level]}>
                  {course.level}
                </Badge>
                {course.status === "Draft" && (
                  <Badge className="bg-slate-600 text-slate-200">Draft</Badge>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
                {course.title}
              </h1>

              <p className="mb-6 text-lg text-slate-300 leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                  <span>{course.totalModules} Modul</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <span>{course.estimatedDuration}</span>
                </div>
                {course.enrolledStudents !== undefined &&
                  course.enrolledStudents > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-slate-400" />
                      <span>
                        {course.enrolledStudents.toLocaleString()} peserta
                      </span>
                    </div>
                  )}
                {course.rating !== undefined && course.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span>{course.rating} rating</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Course Card */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-xl">
                <div className="h-40 bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white/30" />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Terakhir diperbarui</span>
                      <span className="font-medium">
                        {new Date(course.updatedAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <Link href={`/dashboard/courses/${course.id}/edit`}>
                      <Button className="w-full bg-slate-900 hover:bg-slate-800">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Kursus
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Globe className="mr-2 h-4 w-4" />
                      Lihat Halaman Publik
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            {course.fullDescription && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Tentang Kursus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {course.fullDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Course Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Silabus Kursus
                </CardTitle>
                <p className="text-sm text-slate-500">
                  {course.modules.length} modul ·{" "}
                  {course.modules.reduce(
                    (acc, m) => acc + m.learningObjectives.length,
                    0
                  )}{" "}
                  tujuan pembelajaran
                </p>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                            {module.order}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {module.title}
                            </p>
                            <p className="text-sm text-slate-500">
                              {module.learningObjectives.length} tujuan
                              pembelajaran
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-11 space-y-4">
                          {/* Module Description */}
                          <p className="text-slate-600">{module.description}</p>

                          {/* Learning Objectives */}
                          <div>
                            <h5 className="mb-2 text-sm font-medium text-slate-700">
                              Tujuan Pembelajaran:
                            </h5>
                            <ul className="space-y-2">
                              {module.learningObjectives.map(
                                (objective, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm text-slate-600"
                                  >
                                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                    <span>{objective}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Author Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Instruktur</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <AuthorSection author={course.author} variant="full" />
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Yang Akan Dipelajari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.modules.slice(0, 5).map((module) => (
                    <li
                      key={module.id}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span>{module.title}</span>
                    </li>
                  ))}
                  {course.modules.length > 5 && (
                    <li className="text-sm text-slate-500">
                      +{course.modules.length - 5} modul lainnya
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informasi Kursus</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Kategori</dt>
                    <dd className="font-medium text-slate-900">
                      {course.category}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Level</dt>
                    <dd className="font-medium text-slate-900">
                      {course.level}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Durasi</dt>
                    <dd className="font-medium text-slate-900">
                      {course.estimatedDuration}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Jumlah Modul</dt>
                    <dd className="font-medium text-slate-900">
                      {course.totalModules}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Status</dt>
                    <dd>
                      <Badge
                        className={
                          course.status === "Published"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }
                      >
                        {course.status}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Participant List Section */}
        <div className="mt-8">
          <ParticipantList
            participants={participants}
            title="Peserta Terdaftar Kursus"
          />
        </div>
      </div>
    </div>
  );
}
