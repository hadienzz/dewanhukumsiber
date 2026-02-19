"use client";

import { createWorkshopRequest } from "@/services/workshop/create-workshop";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CreateWorkshopFormValues,
  CreateWorkshopRequestPayload,
} from "@/types/types";
/* ==============================
   FORM TYPES (UI STATE)
================================ */

/* ==============================
   VALIDATION SCHEMA
================================ */

const createWorkshopSchema = Yup.object({
  title: Yup.string()
    .min(5, "Judul minimal 5 karakter")
    .required("Judul kursus wajib diisi"),

  short_description: Yup.string()
    .min(10, "Deskripsi singkat minimal 10 karakter")
    .required("Deskripsi singkat wajib diisi"),

  description: Yup.string().required("Deskripsi lengkap wajib diisi"),

  category: Yup.string().required("Kategori wajib dipilih"),

  thumbnail: Yup.mixed<File>().nullable(),

  price: Yup.number()
    .min(1, "Harga minimal 1")
    .required("Harga uang wajib diisi"),

  credit_price: Yup.number()
    .min(1, "Harga kredit minimal 1")
    .required("Harga kredit wajib diisi"),

  benefits: Yup.array()
    .of(
      Yup.string()
        .trim()
        .min(1, "Manfaat wajib diisi")
        .required("Manfaat wajib diisi"),
    )
    .min(3, "Minimal 3 manfaat kursus harus diisi")
    .required("Manfaat kursus wajib diisi"),
});

/* ==============================
   MAIN HOOK
================================ */

const useCreateWorkshop = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-workshop"],
    mutationFn: (payload: CreateWorkshopRequestPayload) => {
      return createWorkshopRequest(payload);
    },
    onSuccess: (response) => {
      toast.success("Kursus berhasil dibuat!");

      const newCourseId = response.data?.workshop_id;

      if (newCourseId) {
        router.push(`/dashboard/workshops/${newCourseId}/modules`);
      }
    },
    onError: (error) => {
      toast.error("Gagal membuat kursus. Silakan coba lagi.");
      console.error(error);
    },
  });

  const formik = useFormik<CreateWorkshopFormValues>({
    initialValues: {
      title: "",
      short_description: "",
      description: "",
      category: "",
      thumbnail: null,
      price: 0,
      credit_price: 0,
      benefits: ["", "", ""],
    },

    validationSchema: createWorkshopSchema,
    validateOnMount: true,

    onSubmit: (values) => {
      const requestPayload: CreateWorkshopRequestPayload = {
        ...values,
        price: Number(values.price || 0),
        credit_price: Number(values.credit_price || 0),
        benefits: values.benefits.filter(
          (benefit) => benefit && benefit.trim().length > 0,
        ),
      };

      mutate(requestPayload);
    },
  });

  return {
    isPending,
    formik,
  };
};

export default useCreateWorkshop;
