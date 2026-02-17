"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Eye,
  FileQuestion,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useAdminExams, useDeleteExam, usePublishExam } from "@/hooks/exam/use-exam";

export default function AdminExamsPage() {
  const [search, setSearch] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useAdminExams({
    page,
    limit: 10,
    isPublished: publishedFilter === "all" ? undefined : publishedFilter === "published",
  });

  const publishMutation = usePublishExam();
  const deleteMutation = useDeleteExam();

  // Filter by search
  const filteredExams = data?.exams?.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePublish = (id: string) => {
    publishMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => setDeleteId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat data ujian...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Kelola Ujian</h1>
            <p className="text-slate-600 mt-2">
              Buat dan kelola ujian sertifikasi
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/exams/create">
              <Plus className="h-4 w-4 mr-2" />
              Buat Ujian
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileQuestion className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Ujian</p>
                  <p className="text-2xl font-bold">{data?.total ?? 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Published</p>
                  <p className="text-2xl font-bold">
                    {data?.exams?.filter((e) => e.is_published).length ?? 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <Edit className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Draft</p>
                  <p className="text-2xl font-bold">
                    {data?.exams?.filter((e) => !e.is_published).length ?? 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Percobaan</p>
                  <p className="text-2xl font-bold">
                    {data?.exams?.reduce((sum, e) => sum + (e._count?.attempts ?? 0), 0) ?? 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Cari ujian..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={publishedFilter} onValueChange={setPublishedFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ujian</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Passing</TableHead>
                  <TableHead>Percobaan</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <FileQuestion className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">Belum ada ujian</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExams?.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          {exam.description && (
                            <p className="text-sm text-slate-500 line-clamp-1">
                              {exam.description}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {exam.training?.title ?? (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            exam.is_published
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          )}
                        >
                          {exam.is_published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>{exam._count?.questions ?? 0}</TableCell>
                      <TableCell>{exam.duration_minutes} menit</TableCell>
                      <TableCell>{exam.passing_score}%</TableCell>
                      <TableCell>{exam._count?.attempts ?? 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/exams/${exam.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Lihat Detail
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/exams/${exam.id}/questions`}>
                                <FileQuestion className="h-4 w-4 mr-2" />
                                Kelola Soal
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/exams/${exam.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {!exam.is_published && (
                              <DropdownMenuItem onClick={() => handlePublish(exam.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Publish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => setDeleteId(exam.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Sebelumnya
            </Button>
            <span className="text-sm text-slate-600">
              Halaman {page} dari {data.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
            >
              Selanjutnya
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Ujian?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ujian beserta semua soal dan riwayat percobaan akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
