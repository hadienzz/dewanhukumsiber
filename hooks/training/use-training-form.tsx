"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type {
  TrainingSession,
  TrainingStatus as UiTrainingStatus,
  TrainingType as UiTrainingType,
} from "@/lib/training-data";
import {
  createTraining,
  type CreateTrainingPayload,
} from "@/services/training";
import { getErrorMessage } from "@/utils/error";

export interface TrainingFormValues {
  title: string;
  short_description: string;
  full_description: string;
  category: string;
  thumbnail: string;
  level: string;
  // date: string;
  // endDate: string;
  // time: string;
  // end_time: string;
  // location: string;
  // isOnline: boolean;
  // maxParticipants: number;
  // price: string;
  // instructor: {
  //   name: string;
  //   title: string;
  //   avatar: string;
  // };
  // syllabus: string[];
  // requirements: string[];
  benefits: string[];
  // // Backend-specific optional fields
  // zoomLink?: string;
  // whatsappLink?: string;
  // discussionSchedule?: string;
}

interface UseTrainingFormOptions {
  mode: "create" | "edit";
  training?: TrainingSession;
}

const mapTrainingToInitialValues = (
  training?: TrainingSession,
): TrainingFormValues => {
  return {
    title: training?.title ?? "",
    short_description: training?.short_description ?? "",
    full_description: training?.full_description ?? "",
    category: training?.category ?? "",
    level: training?.level ?? "Beginner",
    thumbnail: training?.thumbnail ?? "",
    benefits: training?.benefits?.length ? [...training.benefits] : [""],
    // date: training?.date ?? "",
    // endDate: training?.endDate ?? "",
    // time: training?.time ?? "",
    // end_time: training?.end_time ?? "",
    // location: training?.location ?? "",
    // isOnline: training?.isOnline ?? false,
    // maxParticipants: training?.maxParticipants ?? 30,
    // price: training?.price ?? "",
    // instructor: {
    //   name: training?.instructor.name ?? "",
    //   title: training?.instructor.title ?? "",
    //   avatar: training?.instructor.avatar ?? "",
    // },
    // syllabus: training?.syllabus?.length ? [...training.syllabus] : [""],
    // requirements: training?.requirements?.length
    //   ? [...training.requirements]
    //   : [""],
    // benefits: training?.benefits?.length ? [...training.benefits] : [""],
    // zoomLink: undefined,
    // whatsappLink: undefined,
    // discussionSchedule: undefined,
  };
};

const useTrainingForm = ({ mode, training }: UseTrainingFormOptions) => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateTrainingPayload) => createTraining(payload),
  });

  const formik = useFormik<TrainingFormValues>({
    initialValues: mapTrainingToInitialValues(training),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload: CreateTrainingPayload = {
          title: values.title,
          short_description: values.short_description,
          description: values.full_description || values.short_description,
          thumbnail: values.thumbnail,
          benefits: values.benefits.filter((b) => b.trim() !== ""),
          category: values.category,
          level: values.level,
        };

        console.log(payload);
        await mutateAsync(payload);

        toast.success(
          mode === "edit"
            ? "Pelatihan berhasil diperbarui"
            : "Pelatihan berhasil dibuat",
        );
        router.push("/dashboard/training");
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal menyimpan pelatihan"));
      }
    },
  });

  const handleSelectChange = (
    name: keyof TrainingFormValues,
    value: unknown,
  ) => {
    formik.setFieldValue(name as string, value);
  };

  const updateArrayField = (
    field: "syllabus" | "requirements" | "benefits",
    index: number,
    value: string,
  ) => {
    const current = formik.values[field as "benefits"] ?? [];
    const next = [...current];
    next[index] = value;
    formik.setFieldValue(field, next);
  };

  const addArrayItem = (field: "syllabus" | "requirements" | "benefits") => {
    const current = formik.values[field as "benefits"] ?? [];
    const next = [...current, ""];
    formik.setFieldValue(field, next);
  };

  const removeArrayItem = (
    field: "syllabus" | "requirements" | "benefits",
    index: number,
  ) => {
    const current = formik.values[field as "benefits"] ?? [];
    const next = current.filter((_, i) => i !== index);
    formik.setFieldValue(field, next);
  };

  return {
    formik,
    isSubmitting: formik.isSubmitting || isPending,
    handleSelectChange,
    updateArrayField,
    addArrayItem,
    removeArrayItem,
  };
};

export default useTrainingForm;
