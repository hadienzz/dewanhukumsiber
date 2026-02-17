"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CourseForm() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Buat / Perbarui Course</CardTitle>
        <CardDescription>
          Kelola materi course terkait hukum siber untuk peserta lecture.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Judul Course">
            <Input placeholder="Mis. Dasar-Dasar Hukum Siber" />
          </Field>
          <Field label="Kategori">
            <Input placeholder="Mis. Regulasi, Penegakan Hukum" />
          </Field>
        </div>
        <Field label="Ringkasan Singkat">
          <Textarea
            rows={3}
            placeholder="Deskripsikan tujuan utama dan cakupan course."
          />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Level">
            <Input placeholder="Beginner / Intermediate / Advanced" />
          </Field>
          <Field label="Durasi">
            <Input placeholder="Mis. 3 sesi, 6 jam" />
          </Field>
        </div>
        <Field label="Link Materi / LMS">
          <Input placeholder="URL ke materi atau platform pembelajaran" />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button">
            Batal
          </Button>
          <Button type="submit">Simpan Course</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsForm() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Buat / Perbarui Berita</CardTitle>
        <CardDescription>
          Publikasikan informasi terbaru terkait kegiatan dan kebijakan Dewan
          Hukum Siber.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <Field label="Judul Berita">
          <Input placeholder="Mis. Rilis Pedoman Manajemen Insiden Siber" />
        </Field>
        <Field label="Tanggal">
          <Input type="date" />
        </Field>
        <Field label="Ringkasan Singkat">
          <Textarea rows={3} placeholder="Cuplikan singkat isi berita." />
        </Field>
        <Field label="Konten Lengkap">
          <Textarea
            rows={6}
            placeholder="Tuliskan isi berita secara lengkap."
          />
        </Field>
        <Field label="Link Dokumen / Rilis Resmi (opsional)">
          <Input placeholder="URL ke dokumen PDF atau halaman resmi" />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button">
            Batal
          </Button>
          <Button type="submit">Terbitkan Berita</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
