"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Course } from "@/lib/courses-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  Play,
  CheckCircle2,
  Linkedin,
  Globe,
  Twitter,
  GraduationCap,
  FileText,
  ArrowLeft,
  Edit,
} from "lucide-react"

interface CourseDetailProps {
  course: Course
  isPreview?: boolean
}

export function CourseDetail({ course, isPreview = false }: CourseDetailProps) {
  const [activeTab, setActiveTab] = useState("informasi")

  const levelColors = {
    Beginner: "bg-green-100 text-green-700 border-green-200",
    Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Advanced: "bg-red-100 text-red-700 border-red-200",
  }

  const levelLabels = {
    Beginner: "Pemula",
    Intermediate: "Menengah",
    Advanced: "Lanjutan",
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Actions */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/courses"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Daftar Kursus</span>
            </Link>
            {isPreview && (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Mode Preview
                </Badge>
                <Link href={`/dashboard/courses/${course.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Kursus
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 hover:bg-blue-700">{course.category}</Badge>
                <Badge className={levelColors[course.level]}>{levelLabels[course.level]}</Badge>
                {course.status === "Draft" && (
                  <Badge variant="outline" className="border-amber-400 text-amber-400">
                    Draft
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                {course.fullDescription || course.shortDescription}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating || 4.5}</span>
                  <span className="text-slate-400">/ 5.0 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-400" />
                  <span>{course.enrolledStudents || 0} peserta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <span>{course.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                  <span>{course.totalModules} modul</span>
                </div>
              </div>

              {/* Author Mini */}
              <div className="flex items-center gap-4 pt-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {course.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{course.author.name}</p>
                  <p className="text-sm text-slate-400">{course.author.title}</p>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="lg:col-span-1">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-slate-700 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <GraduationCap className="h-16 w-16 mx-auto text-blue-400 mb-3" />
                    <p className="text-slate-300 font-medium">{course.category}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content - Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start bg-white border rounded-lg p-1 h-auto">
                <TabsTrigger 
                  value="informasi" 
                  className="data-[state=active]:bg-slate-900 data-[state=active]:text-white px-6 py-3"
                >
                  Informasi
                </TabsTrigger>
                <TabsTrigger 
                  value="silabus"
                  className="data-[state=active]:bg-slate-900 data-[state=active]:text-white px-6 py-3"
                >
                  Silabus
                </TabsTrigger>
                <TabsTrigger 
                  value="instruktur"
                  className="data-[state=active]:bg-slate-900 data-[state=active]:text-white px-6 py-3"
                >
                  Instruktur
                </TabsTrigger>
              </TabsList>

              {/* Informasi Tab */}
              <TabsContent value="informasi" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-4">Tentang Kursus Ini</h2>
                      <p className="text-slate-600 leading-relaxed">
                        {course.fullDescription || course.shortDescription}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Yang Akan Anda Pelajari
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {course.modules.slice(0, 6).map((module) => (
                          <div key={module.id} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{module.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Persyaratan
                      </h3>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span>Pemahaman dasar tentang sistem hukum Indonesia</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span>Kemampuan membaca dan menganalisis teks hukum</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span>Motivasi untuk belajar dan berdiskusi</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Silabus Tab - Timeline Style */}
              <TabsContent value="silabus" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Silabus Materi</h2>
                    
                    {/* Timeline Silabus */}
                    <div className="relative">
                      {course.modules.map((module, index) => (
                        <div key={module.id} className="relative">
                          {/* Module Section */}
                          <div className="flex gap-8">
                            {/* Left - Module Title */}
                            <div className="w-48 flex-shrink-0 text-right pr-6">
                              <h3 className="font-bold text-slate-900 text-lg leading-tight">
                                {module.title.split(" ").slice(0, 3).join(" ")}
                              </h3>
                              {module.title.split(" ").length > 3 && (
                                <p className="text-slate-600 text-sm mt-1">
                                  {module.title.split(" ").slice(3).join(" ")}
                                </p>
                              )}
                            </div>

                            {/* Timeline Line & Dot */}
                            <div className="relative flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-slate-800 border-4 border-slate-200 z-10" />
                              {index < course.modules.length - 1 && (
                                <div className="w-0.5 bg-slate-800 flex-1 min-h-[80px]" />
                              )}
                            </div>

                            {/* Right - Content */}
                            <div className="flex-1 pb-8">
                              <div className="space-y-3">
                                <p className="text-slate-700">{module.description}</p>
                                
                                {/* Learning Objectives */}
                                <div className="space-y-2 mt-4">
                                  {module.learningObjectives.map((objective, objIndex) => (
                                    <div 
                                      key={objIndex}
                                      className="flex items-start gap-3 text-sm"
                                    >
                                      <div className="relative flex flex-col items-center mt-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                                        {objIndex < module.learningObjectives.length - 1 && (
                                          <div className="w-px h-6 bg-slate-300" />
                                        )}
                                      </div>
                                      <span className="text-slate-600 flex-1">{objective}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Instruktur Tab */}
              <TabsContent value="instruktur" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Tentang Instruktur</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="h-32 w-32 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                          {course.author.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {course.author.name}
                          </h3>
                          <p className="text-blue-600 font-medium">{course.author.title}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span>4.8 Rating Instruktur</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Users className="h-4 w-4" />
                            <span>2,500+ Peserta</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <BookOpen className="h-4 w-4" />
                            <span>12 Kursus</span>
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed">
                          {course.author.bio}
                        </p>

                        {/* Expertise */}
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Keahlian:</p>
                          <div className="flex flex-wrap gap-2">
                            {course.author.expertise.map((exp) => (
                              <Badge 
                                key={exp} 
                                variant="outline"
                                className="bg-slate-50"
                              >
                                {exp}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Social Links */}
                        {course.author.socialLinks && (
                          <div className="flex gap-3 pt-2">
                            {course.author.socialLinks.linkedin && (
                              <a
                                href={course.author.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-lg bg-slate-100 hover:bg-blue-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors"
                              >
                                <Linkedin className="h-5 w-5" />
                              </a>
                            )}
                            {course.author.socialLinks.twitter && (
                              <a
                                href={course.author.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-lg bg-slate-100 hover:bg-sky-100 flex items-center justify-center text-slate-600 hover:text-sky-600 transition-colors"
                              >
                                <Twitter className="h-5 w-5" />
                              </a>
                            )}
                            {course.author.socialLinks.website && (
                              <a
                                href={course.author.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-lg bg-slate-100 hover:bg-green-100 flex items-center justify-center text-slate-600 hover:text-green-600 transition-colors"
                              >
                                <Globe className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Course Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg border-0 overflow-hidden">
                {/* Price Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <div className="text-center">
                    <p className="text-blue-200 line-through text-sm">Rp. 500.000</p>
                    <p className="text-3xl font-bold">Rp. 299.000</p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Course Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <BookOpen className="h-5 w-5" />
                        <span>Total Modul</span>
                      </div>
                      <span className="font-semibold text-slate-900">{course.totalModules} Modul</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Star className="h-5 w-5" />
                        <span>Rating</span>
                      </div>
                      <span className="font-semibold text-slate-900">{course.rating || 4.5} / 5.0</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Users className="h-5 w-5" />
                        <span>Peserta</span>
                      </div>
                      <span className="font-semibold text-slate-900">{course.enrolledStudents || 0} orang</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Clock className="h-5 w-5" />
                        <span>Durasi</span>
                      </div>
                      <span className="font-semibold text-slate-900">{course.estimatedDuration}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Award className="h-5 w-5" />
                        <span>Level</span>
                      </div>
                      <Badge className={levelColors[course.level]}>
                        {levelLabels[course.level]}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3 text-slate-600">
                        <GraduationCap className="h-5 w-5" />
                        <span>Sertifikat</span>
                      </div>
                      <span className="font-semibold text-green-600">Ya</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full h-12 text-lg bg-slate-900 hover:bg-slate-800">
                    Daftar Sekarang
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    Akses materi selamanya
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
