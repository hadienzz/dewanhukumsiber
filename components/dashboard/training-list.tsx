"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrainingSession,
  filterTrainings,
  formatDate,
  getStatusLabel,
  getTypeLabel,
  trainingTypeOptions,
  trainingStatusOptions,
  trainingCategoryOptions,
} from "@/lib/training-data";
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
  Calendar,
  Users,
  MapPin,
  Video,
  Building2,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TrainingListProps {
  trainings: TrainingSession[];
}

const ITEMS_PER_PAGE = 6;

export function TrainingList({
  trainings: initialTrainings,
}: TrainingListProps) {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrainings = filterTrainings(
    searchTerm,
    typeFilter,
    statusFilter,
    categoryFilter
  );
  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const paginatedTrainings = filteredTrainings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    // In a real app, this would call an API
    console.log("Delete training:", id);
  };

  const levelColors: Record<string, string> = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-amber-100 text-amber-700",
    completed: "bg-slate-100 text-slate-700",
  };

  const typeColors: Record<string, string> = {
    pelatihan: "bg-purple-100 text-purple-700",
    workshop: "bg-teal-100 text-teal-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Pelatihan & Workshop
          </h1>
          <p className="text-sm text-slate-600">
            Kelola pelatihan dan workshop Dewan Hukum Siber Indonesia
          </p>
        </div>
        <Link href="/dashboard/training/new">
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pelatihan/Workshop
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Program</CardDescription>
            <CardTitle className="text-3xl">
              {initialTrainings.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {initialTrainings.filter((t) => t.type === "pelatihan").length}{" "}
              Pelatihan,{" "}
              {initialTrainings.filter((t) => t.type === "workshop").length}{" "}
              Workshop
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Akan Datang</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {initialTrainings.filter((t) => t.status === "upcoming").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Program terjadwal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sedang Berlangsung</CardDescription>
            <CardTitle className="text-3xl text-amber-600">
              {initialTrainings.filter((t) => t.status === "ongoing").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Aktif saat ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Peserta</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {initialTrainings
                .reduce((acc, t) => acc + t.enrolledParticipants, 0)
                .toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Terdaftar di semua program
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari pelatihan atau workshop..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "Semua Tipe" },
              ...trainingTypeOptions,
            ]}
            placeholder="Tipe"
            className="w-[140px]"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "Semua Status" },
              ...trainingStatusOptions,
            ]}
            placeholder="Status"
            className="w-40"
          />
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
            options={[
              { value: "all", label: "Semua Kategori" },
              ...trainingCategoryOptions,
            ]}
            placeholder="Kategori"
            className="w-[180px]"
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
        Menampilkan {paginatedTrainings.length} dari {filteredTrainings.length}{" "}
        program
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <div className="rounded-lg border bg-white overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Judul Program</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Peserta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 overflow-hidden rounded bg-muted shrink-0">
                        <Image
                          src={training.thumbnail || "/placeholder.svg"}
                          alt={training.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 line-clamp-1">
                          {training.title}
                        </p>
                        <p className="text-sm text-slate-500 line-clamp-1">
                          {training.instructor.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={typeColors[training.type]}>
                      {getTypeLabel(training.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{training.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={levelColors[training.level]}>
                      {training.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDate(training.date)}</p>
                      <p className="text-slate-500">{training.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>
                        {training.enrolledParticipants}/
                        {training.maxParticipants}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[training.status]}>
                      {getStatusLabel(training.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/training/${training.id}/preview`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/training/${training.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(training.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedTrainings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <p className="text-slate-500">
                      Tidak ada program ditemukan
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedTrainings.map((training) => (
            <TrainingCard
              key={training.id}
              training={training}
              onDelete={handleDelete}
            />
          ))}
          {paginatedTrainings.length === 0 && (
            <div className="col-span-full flex h-32 items-center justify-center rounded-lg border bg-white">
              <p className="text-slate-500">Tidak ada program ditemukan</p>
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
              {Array.from(
                { length: Math.min(totalPages, 5) },
                (_, i) => i + 1
              ).map((page) => (
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Training Card Component
interface TrainingCardProps {
  training: TrainingSession;
  onDelete: (id: string) => void;
}

function TrainingCard({ training, onDelete }: TrainingCardProps) {
  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-amber-100 text-amber-700",
    completed: "bg-slate-100 text-slate-700",
  };

  const typeColors: Record<string, string> = {
    pelatihan: "bg-purple-100 text-purple-700",
    workshop: "bg-teal-100 text-teal-700",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        <Image
          src={training.thumbnail || "/placeholder.svg"}
          alt={training.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className={typeColors[training.type]}>
            {getTypeLabel(training.type)}
          </Badge>
          <Badge className={statusColors[training.status]}>
            {getStatusLabel(training.status)}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-2">
          {training.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {training.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(training.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          {training.isOnline ? (
            <Video className="h-4 w-4" />
          ) : (
            <Building2 className="h-4 w-4" />
          )}
          <span className="truncate">
            {training.isOnline ? "Online" : training.location}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <Users className="h-4 w-4" />
            <span>
              {training.enrolledParticipants}/{training.maxParticipants}
            </span>
          </div>
          {training.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{training.rating}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="font-bold text-primary">{training.price}</span>
          <div className="flex items-center gap-1">
            <Link href={`/dashboard/training/${training.id}/preview`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/dashboard/training/${training.id}/edit`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(training.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
