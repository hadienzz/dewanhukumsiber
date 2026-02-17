"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrainingSession,
  TrainingType,
  TrainingStatus,
  trainingTypeOptions,
  trainingStatusOptions,
  trainingCategoryOptions,
  trainingLevelOptions,
} from "@/lib/training-data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Image as ImageIcon,
  MapPin,
  Plus,
  Save,
  Trash2,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

import useTrainingForm from "@/hooks/training/use-training-form";
import BenefitSection from "./benefit-section";

interface TrainingFormProps {
  training?: TrainingSession;
  mode: "create" | "edit";
}

interface SimpleOption {
  value: string;
  label: string;
}

interface TrainingSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SimpleOption[];
  placeholder: string;
}

function TrainingSelect({
  value,
  onChange,
  options,
  placeholder,
}: TrainingSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TrainingForm({ training, mode }: TrainingFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const {
    formik,
    isSubmitting,
    handleSelectChange,
    updateArrayField,
    addArrayItem,
    removeArrayItem,
  } = useTrainingForm({ mode, training });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <Link href="/dashboard/training">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </Link>
        <div className="mb-6 flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEdit
                ? "Edit Pelatihan/Workshop"
                : "Tambah Pelatihan/Workshop Baru"}
            </h1>
            <p className="text-sm text-slate-600">
              {isEdit
                ? "Perbarui informasi pelatihan atau workshop"
                : "Isi formulir untuk membuat pelatihan atau workshop baru"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>
                Informasi utama tentang pelatihan atau workshop
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Program *</Label>
                <Input
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Contoh: Certified Cyber Law Practitioner (CCLP)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description">Deskripsi Singkat *</Label>
                <Textarea
                  id="short_description"
                  name="short_description"
                  value={values.short_description}
                  onChange={handleChange}
                  placeholder="Deskripsi singkat untuk ditampilkan di card..."
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_description">Deskripsi Lengkap</Label>
                <Textarea
                  id="full_description"
                  name="full_description"
                  value={values.full_description}
                  onChange={handleChange}
                  placeholder="Deskripsi lengkap tentang program ini..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <TrainingSelect
                    value={values.category}
                    onChange={(value) => handleSelectChange("category", value)}
                    options={trainingCategoryOptions}
                    placeholder="Pilih kategori"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <TrainingSelect
                    value={values.level}
                    onChange={(value) => handleSelectChange("level", value)}
                    options={trainingLevelOptions}
                    placeholder="Pilih level"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">URL Thumbnail</Label>
                <div className="flex gap-2">
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    value={values.thumbnail}
                    onChange={handleChange}
                    placeholder="/training/nama-gambar.jpg"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Schedule & Location */}

          <BenefitSection
            values={{ benefits: values.benefits }}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            updateArrayField={updateArrayField}
          />
          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/dashboard/training">
              <Button type="button" variant="outline">
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting
                ? "Menyimpan..."
                : isEdit
                  ? "Simpan Perubahan"
                  : "Buat Program"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 *           {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Jadwal & Lokasi
              </CardTitle>
              <CardDescription>
                Atur tanggal, waktu, dan lokasi pelaksanaan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal Mulai *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Tanggal Selesai</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={values.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="time">Waktu Mulai*</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={values.time}
                    onChange={handleChange}
                    placeholder="09:00 - 16:00 WIB"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">Waktu Selesai*</Label>
                  <Input
                    id="end_time"
                    name="end_time"
                    value={values.end_time}
                    type="time"
                    onChange={handleChange}
                    placeholder="Contoh: 3 hari (24 jam)"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Link Zoom *</Label>
                <Input
                  id="location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  placeholder={"https://zoom.us/j/xxxxxx"}
                  required
                />
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>Link & Komunikasi</CardTitle>
              <CardDescription>
                Informasi pendukung seperti link Zoom dan grup WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zoomLink">Link Zoom (opsional)</Label>
                <Input
                  id="zoomLink"
                  name="zoomLink"
                  value={values.zoomLink || ""}
                  onChange={handleChange}
                  placeholder="https://zoom.us/j/xxxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappLink">
                  Link Grup WhatsApp (opsional)
                </Label>
                <Input
                  id="whatsappLink"
                  name="whatsappLink"
                  value={values.whatsappLink || ""}
                  onChange={handleChange}
                  placeholder="https://chat.whatsapp.com/xxxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discussionSchedule">
                  Jadwal Diskusi (opsional)
                </Label>
                <Input
                  id="discussionSchedule"
                  name="discussionSchedule"
                  value={values.discussionSchedule || ""}
                  onChange={handleChange}
                  placeholder="Contoh: Setiap Rabu, 19.00 WIB"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Instruktur
              </CardTitle>
              <CardDescription>
                Informasi tentang instruktur / narasumber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructorName">Nama Instruktur *</Label>
                <Input
                  id="instructorName"
                  name="instructor.name"
                  value={values.instructor.name}
                  onChange={handleChange}
                  placeholder="Prof. Dr. Nama Lengkap, S.H., M.H."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructorTitle">Jabatan / Keahlian *</Label>
                <Input
                  id="instructorTitle"
                  name="instructor.title"
                  value={values.instructor.title}
                  onChange={handleChange}
                  placeholder="Guru Besar Hukum Siber & Pakar Digital Forensik"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructorAvatar">URL Foto Instruktur</Label>
                <Input
                  id="instructorAvatar"
                  name="instructor.avatar"
                  value={values.instructor.avatar}
                  onChange={handleChange}
                  placeholder="https://placehold.co/200x200/6b7280/ffffff?text=Instructor"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Harga & Kapasitas</CardTitle>
              <CardDescription>Atur harga dan batas peserta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    placeholder="Rp 5.000.000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maksimal Peserta *</Label>
                  <Input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    value={values.maxParticipants}
                    onChange={handleChange}
                    min={1}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Materi / Silabus</CardTitle>
              <CardDescription>
                Daftar materi yang akan dipelajari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {values.syllabus.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-semibold">
                    {index + 1}
                  </div>
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayField("syllabus", index, e.target.value)
                    }
                    placeholder={`Materi ${index + 1}`}
                  />
                  {values.syllabus.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => removeArrayItem("syllabus", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => addArrayItem("syllabus")}
              >
                <Plus className="h-4 w-4" />
                Tambah Materi
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Persyaratan Peserta</CardTitle>
              <CardDescription>
                Syarat yang harus dipenuhi calon peserta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {values.requirements.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayField("requirements", index, e.target.value)
                    }
                    placeholder={`Persyaratan ${index + 1}`}
                  />
                  {values.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => removeArrayItem("requirements", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => addArrayItem("requirements")}
              >
                <Plus className="h-4 w-4" />
                Tambah Persyaratan
              </Button>
            </CardContent>
          </Card>
*/
