"use client";

import { useState } from "react";
import { usePesertaPelatihanPaginated } from "@/hooks/peserta-pelatihan/use-peserta-pelatihan";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Loader2,
  Search,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PesertaPelatihanPage() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = usePesertaPelatihanPaginated(page, limit);
  const peserta = data?.data ?? [];
  const meta = data?.meta;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderPageNumbers = () => {
    if (!meta) return null;
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(meta.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <GraduationCap className="h-4 w-4" />
              {t("Peserta Pelatihan", "Training Participants")}
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              {t(
                "Daftar Peserta Pelatihan",
                "Training Participants Directory",
              )}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
              {t(
                "Berikut adalah daftar peserta yang telah menyelesaikan pelatihan bersama Dewan Hukum Siber Indonesia.",
                "Here is a list of participants who have completed training with the Indonesian Cyber Law Council.",
              )}
            </p>
            {meta && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm">
                <Users className="h-4 w-4" />
                {t(
                  `Total ${meta.total} peserta terdaftar`,
                  `Total ${meta.total} registered participants`,
                )}
              </div>
            )}
          </div>
        </section>

        {/* Table Section */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-12 text-center font-semibold text-slate-700">
                    No
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    {t("Nama Lengkap", "Full Name")}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    {t("Nama Pelatihan", "Training Name")}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    {t("Tanggal Terdaftar", "Date Registered")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-16 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-teal-600" />
                      <p className="mt-2 text-sm text-slate-500">
                        {t("Memuat data...", "Loading data...")}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : peserta.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-16 text-center text-slate-500"
                    >
                      <GraduationCap className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                      <p className="text-lg font-medium">
                        {t(
                          "Belum ada data peserta",
                          "No participant data yet",
                        )}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  peserta.map((p, idx) => (
                    <TableRow
                      key={p.id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <TableCell className="text-center text-sm text-slate-500">
                        {(page - 1) * limit + idx + 1}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {p.nama_lengkap}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {p.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-teal-200 bg-teal-50 text-teal-700"
                        >
                          {p.nama_pelatihan}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {formatDate(p.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-slate-600">
                {t("Menampilkan", "Showing")}{" "}
                <span className="font-medium">
                  {(page - 1) * limit + 1}
                </span>{" "}
                -{" "}
                <span className="font-medium">
                  {Math.min(page * limit, meta.total)}
                </span>{" "}
                {t("dari", "of")}{" "}
                <span className="font-medium">{meta.total}</span>{" "}
                {t("peserta", "participants")}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!meta.hasPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:ml-1">
                    {t("Sebelumnya", "Previous")}
                  </span>
                </Button>
                {renderPageNumbers()?.map((p) => (
                  <Button
                    key={p}
                    variant={page === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(p)}
                    className="h-8 w-8 p-0"
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) => Math.min(meta.totalPages, p + 1))
                  }
                  disabled={!meta.hasNext}
                >
                  <span className="sr-only sm:not-sr-only sm:mr-1">
                    {t("Selanjutnya", "Next")}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
