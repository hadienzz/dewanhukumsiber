"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CourseCard } from "@/components/dashboard/course-card"
import {
  Course,
  categoryOptions,
  statusOptions,
  filterCourses,
} from "@/lib/courses-data"
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Grid3X3,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface CourseListProps {
  courses: Course[]
}

const ITEMS_PER_PAGE = 6

export function CourseList({ courses: initialCourses }: CourseListProps) {
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCourses = filterCourses(searchTerm, categoryFilter, statusFilter)
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleDelete = (id: string) => {
    // In a real app, this would call an API
    console.log("Delete course:", id)
  }

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  }

  const statusColors = {
    Draft: "bg-slate-100 text-slate-700",
    Published: "bg-blue-100 text-blue-700",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Kursus</h1>
          <p className="text-sm text-slate-600">
            Kelola kursus hukum Indonesia Anda
          </p>
        </div>
        <Link href="/dashboard/courses/new">
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kursus
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari kursus..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value)
              setCurrentPage(1)
            }}
            options={[{ value: "all", label: "Semua Kategori" }, ...categoryOptions]}
            placeholder="Kategori"
            className="w-[180px]"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value)
              setCurrentPage(1)
            }}
            options={[{ value: "all", label: "Semua Status" }, ...statusOptions]}
            placeholder="Status"
            className="w-[150px]"
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border p-1">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "card" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("card")}
            className="h-8 w-8 p-0"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results info */}
      <div className="text-sm text-slate-600">
        Menampilkan {paginatedCourses.length} dari {filteredCourses.length} kursus
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Kursus</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-center">Modul</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900">{course.title}</p>
                      <p className="text-sm text-slate-500 line-clamp-1">
                        {course.shortDescription}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={levelColors[course.level]}>
                      {course.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {course.totalModules}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[course.status]}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
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
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <p className="text-slate-500">Tidak ada kursus ditemukan</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCourses.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))}
          {paginatedCourses.length === 0 && (
            <div className="col-span-full flex h-32 items-center justify-center rounded-lg border bg-white">
              <p className="text-slate-500">Tidak ada kursus ditemukan</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Sebelumnya
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
