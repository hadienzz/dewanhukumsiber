"use client";

import { Course } from "@/lib/courses-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, FileText } from "lucide-react";

import TitleField from "@/components/dashboard/course-title-field";
import ShortDescriptionField from "@/components/dashboard/course-short-description-field";
import FullDescriptionField from "@/components/dashboard/course-full-description-field";
import CategoryField from "@/components/dashboard/course-category-field";
import ThumbnailField from "@/components/dashboard/course-thumbnail-field";
import CourseBenefitsField from "@/components/dashboard/course-benefits-field";
import PriceField from "./course-duration-field";
import useCreateWorkshop from "@/hooks/workshop/use-create-course";

interface WorkshopFormProps {
  course?: Course;
  mode: "create" | "edit";
}

export function CourseForm({ mode }: WorkshopFormProps) {
  const { formik, isPending } = useCreateWorkshop();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/workshops"
            className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Workshop
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "create" ? "Tambah Kursus Baru" : "Edit Kursus"}
          </h1>

          <p className="text-sm text-slate-600">
            {mode === "create"
              ? "Buat kursus baru dengan mengisi informasi berikut."
              : "Perbarui informasi kursus Anda."}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informasi Dasar Kursus
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <TitleField
                value={formik.values.title}
                error={formik.errors.title as string | undefined}
                onChange={(value) => formik.setFieldValue("title", value)}
              />

              <ShortDescriptionField
                value={formik.values.short_description}
                error={formik.errors.short_description as string | undefined}
                onChange={(value) =>
                  formik.setFieldValue("short_description", value)
                }
              />

              <FullDescriptionField
                value={formik.values.description}
                error={formik.errors.description as string | undefined}
                onChange={(value) => formik.setFieldValue("description", value)}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <CategoryField
                  value={formik.values.category}
                  error={formik.errors.category as string | undefined}
                  onChange={(value) => formik.setFieldValue("category", value)}
                />
                <PriceField
                  value={formik.values.credit_price.toString()}
                  error={formik.errors.credit_price as string | undefined}
                  onChange={(value) =>
                    formik.setFieldValue("credit_price", value)
                  }
                />
              </div>

              <ThumbnailField
                value={formik.values.thumbnail}
                onChange={(file) => formik.setFieldValue("thumbnail", file)}
              />
            </CardContent>
          </Card>

          {/* Benefits */}
          <CourseBenefitsField
            benefits={formik.values.benefits}
            onChange={(next) => formik.setFieldValue("benefits", next)}
          />

          {/* Action */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800"
              disabled={isPending || !formik.isValid || !formik.dirty}
            >
              <Check className="mr-2 h-4 w-4" />
              Simpan & Lanjut Isi Modul
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
