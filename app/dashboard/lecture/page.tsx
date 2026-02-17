"use client";

import { LectureShell } from "@/components/dashboard/lecture-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookOpen, Newspaper } from "lucide-react";
import Link from "next/link";

export default function LectureOverviewPage() {
  return (
    <LectureShell
      title="Lecture Overview"
      description="Kelola konten pembelajaran dan berita terkait hukum siber dalam satu panel."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen size={18} />
              </span>
              Courses
            </CardTitle>
            <CardDescription>
              Buat, perbarui, dan kelola course lecture terkait hukum siber.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground">
              Atur struktur materi, level, dan durasi course.
            </div>
            <Link
              href="/dashboard/lecture/courses"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              Kelola
              <ArrowRight size={14} />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Newspaper size={18} />
              </span>
              News
            </CardTitle>
            <CardDescription>
              Buat dan terbitkan berita terbaru kegiatan dan kebijakan Dewan.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground">
              Kelola artikel, tanggal publikasi, dan link dokumen.
            </div>
            <Link
              href="/dashboard/lecture/news"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              Kelola
              <ArrowRight size={14} />
            </Link>
          </CardContent>
        </Card>
      </div>
    </LectureShell>
  );
}
