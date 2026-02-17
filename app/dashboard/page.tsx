"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetWorkshops } from "@/hooks/workshop/use-get-workshops";
import {
  TrendingUp,
  Users,
  Presentation,
  Calendar,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import WorkshopItem from "@/components/dashboard/workshop-item";

export default function DashboardPage() {
  const { workshops, isLoading } = useGetWorkshops();

  const stats = [
    {
      title: "Workshop",
      value: workshops.length,
      description: `${workshops.length} total workshop`,
      icon: Presentation,
      color: "bg-teal-500",
    },
    {
      title: "Total Peserta",
      value: workshops.length.toLocaleString(),
      description: "Perkiraan peserta workshop",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Rating Rata-rata",
      value: workshops.length ? "4.8" : "-",
      description: "Rating workshop (mock)",
      icon: TrendingUp,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Selamat Datang di Dashboard
          </h1>
          <p className="text-slate-600">Kelola pelatihan Anda dengan mudah</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workshop Terbaru (menggantikan kursus) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pelatihan Terbaru</span>
              <Link
                href="/dashboard/workshops"
                className="text-sm font-normal text-blue-600 hover:underline"
              >
                Lihat semua
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-slate-500">Memuat pelatihan...</p>
            ) : workshops.length === 0 ? (
              <p className="text-sm text-slate-500">Belum ada pelatihan</p>
            ) : (
              <div className="space-y-4">
                {workshops.slice(0, 4).map((workshop) => (
                  <WorkshopItem workshop={workshop} key={workshop.id} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section workshop kedua bisa ditambahkan nanti jika dibutuhkan */}

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/dashboard/workshops/new"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Buat Pelatihan Baru
                  </p>
                  <p className="text-sm text-slate-500">
                    Tambah kursus hukum baru
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/workshop/new"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                  <Presentation className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Tambah Pelatihan
                  </p>
                  <p className="text-sm text-slate-500">Buat pelatihan</p>
                </div>
              </Link>
              <Link
                href="/dashboard/training"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Kelola Pelatihan
                  </p>
                  <p className="text-sm text-slate-500">
                    Atur jadwal & peserta
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/students"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Lihat Peserta
                  </p>
                  <p className="text-sm text-slate-500">Kelola data peserta</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Trainings */}
        {/* <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pelatihan Akan Datang</span>
              <Link
                href="/dashboard/training"
                className="text-sm font-normal text-blue-600 hover:underline"
              >
                Lihat semua
              </Link>
            </CardTitle>
          </CardHeader>
          {/* <CardContent></CardContent> */}
        {/* </Card> */}
      </div>
    </div>
  );
}
