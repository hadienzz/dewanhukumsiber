"use client";

import { useState, useRef } from "react";
import {
  useKeanggotaan,
  useCreateKeanggotaan,
  useDeleteKeanggotaan,
} from "@/hooks/keanggotaan/use-keanggotaan";
import { formatName } from "@/utils/format-name";
import { getGoogleDriveImageUrl } from "@/utils/google-drive-image";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
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
import { Plus, Trash2, Loader2, Search, Upload } from "lucide-react";
import Image from "next/image";

export default function KeanggotaanDashboardPage() {
  const { data: members, isLoading } = useKeanggotaan();
  const createMutation = useCreateKeanggotaan();
  const deleteMutation = useDeleteKeanggotaan();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [role, setRole] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = (members ?? []).filter((m) =>
    formatName(m.nama_lengkap).toLowerCase().includes(search.toLowerCase()),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    if (!namaLengkap || !role || !fotoFile) return;
    const formData = new FormData();
    formData.append("nama_lengkap", namaLengkap);
    formData.append("role", role);
    formData.append("foto", fotoFile);

    await createMutation.mutateAsync(formData);
    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setNamaLengkap("");
    setRole("");
    setFotoFile(null);
    setFotoPreview(null);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Kelola Keanggotaan
            </h1>
            <p className="text-sm text-slate-500">
              Tambah dan kelola data anggota DHSI
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Anggota
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Anggota Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                  <Input
                    id="nama_lengkap"
                    placeholder="Masukkan nama lengkap"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Jabatan / Role</Label>
                  <Input
                    id="role"
                    placeholder="Contoh: Ketua, Sekretaris, Anggota"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Foto Formal</Label>
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 transition-colors hover:border-slate-400"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {fotoPreview ? (
                      <div className="relative h-32 w-32 overflow-hidden rounded-full">
                        <Image
                          src={fotoPreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <Upload className="mb-2 h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-500">
                          Klik untuk upload foto
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  disabled={
                    !namaLengkap ||
                    !role ||
                    !fotoFile ||
                    createMutation.isPending
                  }
                  className="w-full"
                >
                  {createMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari anggota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Foto</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-slate-500"
                  >
                    Belum ada data keanggotaan.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((member) => {
                  const imageUrl = getGoogleDriveImageUrl(
                    member.upload_foto_formal,
                  );
                  const isSupabaseUrl =
                    member.upload_foto_formal?.startsWith("http") && !imageUrl;
                  const finalUrl = imageUrl ?? (isSupabaseUrl ? member.upload_foto_formal : null);

                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                          {finalUrl ? (
                            <Image
                              src={finalUrl}
                              alt={member.nama_lengkap}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-400">
                              {formatName(member.nama_lengkap)
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatName(member.nama_lengkap)}
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Anda yakin ingin menghapus{" "}
                                <strong>
                                  {formatName(member.nama_lengkap)}
                                </strong>
                                ? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(member.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
  );
}
