"use client";

import { useState, useRef } from "react";
import {
  useKeanggotaan,
  useCreateKeanggotaan,
  useDeleteKeanggotaan,
} from "@/hooks/keanggotaan/use-keanggotaan";
import { formatName } from "@/utils/format-name";
import { getGoogleDriveImageUrl } from "@/utils/google-drive-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Loader2, Search, Upload, Users } from "lucide-react";
import Image from "next/image";
import {
  KATEGORI_TIM,
  PROFESI_ANGGOTA,
} from "@/types/keanggotaan.types";

export default function KeanggotaanDashboardPage() {
  const { data: members, isLoading } = useKeanggotaan();
  const createMutation = useCreateKeanggotaan();
  const deleteMutation = useDeleteKeanggotaan();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [role, setRole] = useState("");
  const [kategori, setKategori] = useState<string>("Direksi");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = (members ?? []).filter((m) => {
    const matchesSearch = formatName(m.nama_lengkap)
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTab =
      activeTab === "all" || m.kategori === activeTab;
    return matchesSearch && matchesTab;
  });

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
    formData.append("kategori", kategori);
    formData.append("foto", fotoFile);

    await createMutation.mutateAsync(formData);
    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setNamaLengkap("");
    setRole("");
    setKategori("Direksi");
    setFotoFile(null);
    setFotoPreview(null);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const kategoriColor = (kat: string) => {
    switch (kat) {
      case "Direksi":
        return "bg-blue-100 text-blue-700";
      case "Tim Management":
        return "bg-purple-100 text-purple-700";
      case "Ahli dan Profesi Anggota":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const countByKategori = (kat: string) =>
    (members ?? []).filter((m) => m.kategori === kat).length;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Tim Kami</h1>
          <p className="text-sm text-slate-500">
            Tambah dan kelola data tim DHSI — Direksi, Tim Management, dan Ahli &amp; Profesi Anggota
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Anggota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Anggota Tim Baru</DialogTitle>
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
                <Label>Kategori Tim</Label>
                <Select value={kategori} onValueChange={(val) => { setKategori(val); setRole(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {KATEGORI_TIM.map((kat) => (
                      <SelectItem key={kat} value={kat}>
                        {kat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">
                  {kategori === "Ahli dan Profesi Anggota"
                    ? "Profesi / Spesialisasi"
                    : "Jabatan / Role"}
                </Label>
                {kategori === "Ahli dan Profesi Anggota" ? (
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih profesi" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESI_ANGGOTA.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="role"
                    placeholder={
                      kategori === "Direksi"
                        ? "Contoh: Ketua Umum, Wakil Ketua"
                        : "Contoh: Manager Operasional, Staff Admin"
                    }
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                )}
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

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-xl font-bold text-slate-900">{members?.length ?? 0}</p>
            </div>
          </div>
        </div>
        {KATEGORI_TIM.map((kat) => (
          <div key={kat} className="rounded-lg border bg-white p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${kat === "Direksi" ? "bg-blue-100" : kat === "Tim Management" ? "bg-purple-100" : "bg-emerald-100"}`}>
                <Users className={`h-5 w-5 ${kat === "Direksi" ? "text-blue-600" : kat === "Tim Management" ? "text-purple-600" : "text-emerald-600"}`} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{kat}</p>
                <p className="text-xl font-bold text-slate-900">{countByKategori(kat)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari anggota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            {KATEGORI_TIM.map((kat) => (
              <TabsTrigger key={kat} value={kat}>
                {kat === "Ahli dan Profesi Anggota" ? "Ahli & Profesi" : kat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Foto</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jabatan / Profesi</TableHead>
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
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-slate-500"
                >
                  Belum ada data tim.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((member) => {
                const imageUrl = getGoogleDriveImageUrl(
                  member.upload_foto_formal,
                );
                const isSupabaseUrl =
                  member.upload_foto_formal?.startsWith("http") && !imageUrl;
                const finalUrl =
                  imageUrl ??
                  (isSupabaseUrl ? member.upload_foto_formal : null);

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
                    <TableCell>
                      <Badge className={kategoriColor(member.kategori)}>
                        {member.kategori}
                      </Badge>
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
                            <AlertDialogTitle>
                              Hapus Anggota Tim?
                            </AlertDialogTitle>
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
