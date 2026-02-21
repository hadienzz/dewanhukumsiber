"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  usePesertaPelatihan,
  useCreatePesertaPelatihan,
  useDeletePesertaPelatihan,
} from "@/hooks/peserta-pelatihan/use-peserta-pelatihan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Loader2,
  Search,
  GraduationCap,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const validationSchema = Yup.object({
  nama_lengkap: Yup.string().required("Nama lengkap wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  nama_pelatihan: Yup.string().required("Nama pelatihan wajib diisi"),
});

export default function PesertaPelatihanDashboardPage() {
  const { data: peserta, isLoading } = usePesertaPelatihan();
  const createMutation = useCreatePesertaPelatihan();
  const deleteMutation = useDeletePesertaPelatihan();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formik = useFormik({
    initialValues: {
      nama_lengkap: "",
      email: "",
      nama_pelatihan: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await createMutation.mutateAsync(values);
      resetForm();
      setDialogOpen(false);
    },
  });

  const filtered = (peserta ?? []).filter((p) => {
    const q = search.toLowerCase();
    return (
      p.nama_lengkap.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.nama_pelatihan.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Unique trainings count
  const uniqueTrainings = new Set(
    (peserta ?? []).map((p) => p.nama_pelatihan),
  ).size;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Peserta Pelatihan
          </h1>
          <p className="text-sm text-slate-500">
            Input dan kelola data peserta yang sudah mengikuti pelatihan
          </p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) formik.resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Peserta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Peserta Pelatihan</DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                <Input
                  id="nama_lengkap"
                  placeholder="Masukkan nama lengkap"
                  {...formik.getFieldProps("nama_lengkap")}
                />
                {formik.touched.nama_lengkap && formik.errors.nama_lengkap && (
                  <p className="text-sm text-red-500">{formik.errors.nama_lengkap}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_pelatihan">Nama Pelatihan</Label>
                <Input
                  id="nama_pelatihan"
                  placeholder="Contoh: Pelatihan Hukum Siber Dasar"
                  {...formik.getFieldProps("nama_pelatihan")}
                />
                {formik.touched.nama_pelatihan && formik.errors.nama_pelatihan && (
                  <p className="text-sm text-red-500">{formik.errors.nama_pelatihan}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || createMutation.isPending}
                className="w-full"
              >
                {createMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Peserta</p>
              <p className="text-xl font-bold text-slate-900">
                {peserta?.length ?? 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <GraduationCap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pelatihan Unik</p>
              <p className="text-xl font-bold text-slate-900">
                {uniqueTrainings}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <Calendar className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ditambahkan Hari Ini</p>
              <p className="text-xl font-bold text-slate-900">
                {(peserta ?? []).filter(
                  (p) =>
                    new Date(p.created_at).toDateString() ===
                    new Date().toDateString(),
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Cari nama, email, atau pelatihan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nama Pelatihan</TableHead>
              <TableHead>Tanggal Ditambahkan</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" />
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-slate-500"
                >
                  Belum ada data peserta pelatihan.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.nama_lengkap}
                  </TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{p.nama_pelatihan}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(p.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Peserta?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Anda yakin ingin menghapus{" "}
                            <strong>{p.nama_lengkap}</strong> dari data peserta
                            pelatihan? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(p.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} dari{" "}
            {filtered.length} peserta
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ),
            )}
            {totalPages > 5 && (
              <span className="text-sm text-slate-400">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
