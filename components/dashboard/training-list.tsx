"use client";

import { useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatDate,
  getStatusLabel,
  getTypeLabel,
  trainingTypeOptions,
  trainingStatusOptions,
  trainingCategoryOptions,
} from "@/lib/training-data";
import { useGetWorkshops } from "@/hooks/workshop/use-get-workshops";
import { formatPrice } from "@/utils/format-price";
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
  Video,
  Building2,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TrainingListProps {
  trainings?: TrainingListItem[];
}

interface TrainingListItem {
  id: string;
  title: string;
  shortDescription: string;
  type: "pelatihan" | "workshop";
  status: "upcoming" | "ongoing" | "completed";
  thumbnail: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  instructor: {
    name: string;
  };
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  maxParticipants: number;
  enrolledParticipants: number;
  rating?: number;
  moduleCount: number;
  price: string;
}

const ITEMS_PER_PAGE = 6;

export function TrainingList({
  trainings: initialTrainings,
}: TrainingListProps) {
  const { workshops, isLoading, isError } = useGetWorkshops();
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainings: TrainingListItem[] = useMemo(() => {
    if (initialTrainings && initialTrainings.length > 0)
      return initialTrainings;

    return (workshops ?? []).map((workshop) => ({
      id: workshop.id,
      title: workshop.title,
      shortDescription: workshop.short_description ?? "",
      type: "pelatihan",
      status: "upcoming",
      thumbnail: workshop.thumbnail ?? "/placeholder.svg",
      date: workshop.start_date ?? workshop.created_at,
      time: "-",
      location: "Online",
      isOnline: true,
      instructor: {
        name: "Dewan Hukum Siber Indonesia",
      },
      category: workshop.category ?? "Pelatihan DHSI",
      level: "Beginner",
      maxParticipants: 25,
      enrolledParticipants: workshop.participant_count ?? 0,
      rating: workshop.avg_rating ?? 0,
      moduleCount: workshop.module_count ?? 0,
      price: typeof workshop.price === "number" ? formatPrice(workshop.price) : "-",
    }));
  }, [initialTrainings, workshops]);

  const filteredTrainings = useMemo(() => {
    return trainings.filter((training) => {
      const matchesSearch =
        searchTerm === "" ||
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "" || typeFilter === "all" || training.type === typeFilter;

      const matchesStatus =
        statusFilter === "" ||
        statusFilter === "all" ||
        training.status === statusFilter;

      const matchesCategory =
        categoryFilter === "" ||
        categoryFilter === "all" ||
        training.category === categoryFilter;

      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  }, [trainings, searchTerm, typeFilter, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const paginatedTrainings = filteredTrainings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
            <CardTitle className="text-3xl">{trainings.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              {trainings.filter((t) => t.type === "pelatihan").length}{" "}
              Pelatihan, {trainings.filter((t) => t.type === "workshop").length}{" "}
              Workshop
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Akan Datang</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {trainings.filter((t) => t.status === "upcoming").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Program terjadwal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sedang Berlangsung</CardDescription>
            <CardTitle className="text-3xl text-amber-600">
              {trainings.filter((t) => t.status === "ongoing").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Aktif saat ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Peserta</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {trainings
                .reduce((acc, t) => acc + t.enrolledParticipants, 0)
                .toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Terdaftar di semua program
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipe" />
            </SelectTrigger>
            <SelectContent>
              {[{ value: "all", label: "Semua Tipe" }, ...trainingTypeOptions].map(
                (opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {[{ value: "all", label: "Semua Status" }, ...trainingStatusOptions].map(
                (opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {[{ value: "all", label: "Semua Kategori" }, ...trainingCategoryOptions].map(
                (opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
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
      {isLoading && trainings.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-center text-sm text-slate-600">
          Memuat data pelatihan...
        </div>
      )}

      {isError && trainings.length === 0 && (
        <div className="rounded-lg border bg-white p-6 text-center text-sm text-red-600">
          Gagal memuat data pelatihan
        </div>
      )}

      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-lg border bg-white">
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
                      <div className="bg-muted relative h-10 w-14 shrink-0 overflow-hidden rounded">
                        <Image
                          src={training.thumbnail || "/placeholder.svg"}
                          alt={training.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="line-clamp-1 font-medium text-slate-900">
                          {training.title}
                        </p>
                        <p className="line-clamp-1 text-sm text-slate-500">
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
                        {training.enrolledParticipants} peserta
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
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
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
                (_, i) => i + 1,
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
  training: TrainingListItem;
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
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="bg-muted relative h-40 w-full overflow-hidden">
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
        <CardTitle className="line-clamp-2 text-base">
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
              {training.enrolledParticipants} peserta
            </span>
          </div>
          {training.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{training.rating}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <span className="text-primary font-bold">{training.price}</span>
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
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
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
