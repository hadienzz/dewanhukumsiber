"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import * as Yup from "yup";

import useGetCourseTitle from "@/hooks/workshop/use-get-course-by-id";
import { CourseModule, ModuleType } from "@/types/course-module";
import getWorkshopModules from "@/services/workshop/get-workshop-modules";
import saveWorkshopModulesRequest, {
  SaveWorkshopModulesPayload,
} from "@/services/workshop/save-workshop-modules";

const moduleTypes: ModuleType[] = [
  "video_exam",
  "video_discussion",
  "live_class_exam",
  "exam_only",
];

const courseModulesSchema = Yup.object({
  modules: Yup.array()
    .of(
      Yup.object({
        title: Yup.string()
          .trim()
          .min(3, "Judul modul minimal 3 karakter")
          .required("Judul modul wajib diisi"),
        type: Yup.mixed<ModuleType>()
          .oneOf(moduleTypes, "Tipe modul tidak valid")
          .required("Tipe modul wajib dipilih"),
        date: Yup.string().trim().required("Tanggal modul wajib diisi"),
        order: Yup.number()
          .typeError("Urutan modul tidak valid")
          .integer("Urutan modul tidak valid")
          .min(1, "Urutan modul tidak valid")
          .required("Urutan modul wajib diisi"),
        youtubeUrl: Yup.string().when("type", {
          is: (t: ModuleType) => t === "video_exam",
          then: (s) =>
            s.trim()
              .min(1, "URL YouTube wajib diisi")
              .required("URL YouTube wajib diisi"),
          otherwise: (s) => s.optional(),
        }),
        zoomUrl: Yup.string().when("type", {
          is: (t: ModuleType) =>
            t === "video_discussion" || t === "live_class_exam",
          then: (s) =>
            s.trim().min(1, "URL Zoom wajib diisi").required("URL Zoom wajib diisi"),
          otherwise: (s) => s.optional(),
        }),
        whatsappGroupUrl: Yup.string().when("type", {
          is: (t: ModuleType) => t === "video_discussion",
          then: (s) =>
            s.trim()
              .min(1, "Link grup WhatsApp wajib diisi")
              .required("Link grup WhatsApp wajib diisi"),
          otherwise: (s) => s.optional(),
        }),
        examFormUrl: Yup.string().when("type", {
          is: (t: ModuleType) =>
            t === "video_exam" || t === "live_class_exam" || t === "exam_only",
          then: (s) =>
            s.trim()
              .min(1, "URL Google Form ujian wajib diisi")
              .required("URL Google Form ujian wajib diisi"),
          otherwise: (s) => s.optional(),
        }),
      }),
    )
    .min(1, "Minimal satu modul harus ditambahkan")
    .required(),
});

export interface CourseModulesFormValues {
  modules: CourseModule[];
  draftTitle: string;
  draftDate: string;
  draftType: ModuleType | null;
}

const useCourseModulesBuilder = () => {
  const router = useRouter();
  const { id: courseId } = useParams();
  const { title, isLoading } = useGetCourseTitle(courseId as string);

  const { data: existingModulesResponse } = useQuery({
    queryKey: ["workshop-modules-existing", courseId],
    queryFn: async () => getWorkshopModules(courseId as string),
    enabled: Boolean(courseId),
  });

  const existingMaxOrder = (existingModulesResponse?.data ?? []).reduce(
    (max, m) => Math.max(max, Number(m.order ?? 0)),
    0,
  );

  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const { mutate: saveModules, isPending } = useMutation({
    mutationKey: ["workshop-modules", courseId],
    mutationFn: (values: CourseModulesFormValues) => {
      const payload: SaveWorkshopModulesPayload = {
        modules: values.modules.map((module, index) => ({
          title: module.title,
          type: module.type,
          date: module.date,
          order: module.order ?? index + 1,
          youtube_url: module.youtubeUrl || undefined,
          zoom_url: module.zoomUrl || undefined,
          whatsapp_group_url: module.whatsappGroupUrl || undefined,
          exam_form_url: module.examFormUrl || undefined,
        })),
      };

      return saveWorkshopModulesRequest(courseId as string, payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Modul berhasil disimpan");
      router.push(`/dashboard/workshops/${courseId}`);
    },
    onError: () => {
      toast.error("Gagal menyimpan modul. Silakan coba lagi.");
    },
  });

  const formik = useFormik<CourseModulesFormValues>({
    initialValues: {
      modules: [],
      draftTitle: "",
      draftDate: "",
      draftType: null,
    },
    validationSchema: courseModulesSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      saveModules(values);
    },
  });

  const openTypeDialog = () => {
    setIsTypeDialogOpen(true);
  };

  const handleTypeDialogChange = (open: boolean) => {
    setIsTypeDialogOpen(open);
  };

  const handleSelectType = (type: ModuleType) => {
    const nextIndex = existingMaxOrder + formik.values.modules.length + 1;

    formik.setFieldValue("draftType", type);
    formik.setFieldValue("draftTitle", `Modul ${nextIndex}`);
    formik.setFieldValue("draftDate", "");

    setIsTypeDialogOpen(false);
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleDialogChange = (open: boolean) => {
    setIsScheduleDialogOpen(open);
  };

  const handleCancelSchedule = () => {
    setIsScheduleDialogOpen(false);
    formik.setFieldValue("draftType", null);
    formik.setFieldValue("draftTitle", "");
    formik.setFieldValue("draftDate", "");
  };

  const handleConfirmSchedule = () => {
    const { draftType, draftTitle, draftDate, modules } = formik.values;

    if (!draftType || !draftDate) return;

    const nextOrder = existingMaxOrder + modules.length + 1;

    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title: draftTitle || `Modul ${nextOrder}`,
      type: draftType,
      isExpanded: false,
      order: nextOrder,
      date: draftDate,
      youtubeUrl: "",
      zoomUrl: "",
      whatsappGroupUrl: "",
      examFormUrl: "",
    };

    formik.setFieldValue("modules", [...modules, newModule]);

    setIsScheduleDialogOpen(false);
    formik.setFieldValue("draftType", null);
    formik.setFieldValue("draftTitle", "");
    formik.setFieldValue("draftDate", "");
  };

  const toggleModuleExpand = (moduleId: string) => {
    const updatedModules = formik.values.modules.map((module) =>
      module.id === moduleId
        ? { ...module, isExpanded: !module.isExpanded }
        : module,
    );

    formik.setFieldValue("modules", updatedModules);
  };

  const handleChangeDraftTitle = (value: string) => {
    formik.setFieldValue("draftTitle", value);
  };

  const handleChangeDraftDate = (value: string) => {
    formik.setFieldValue("draftDate", value);
  };

  const handleChangeModuleField = <K extends keyof CourseModule>(
    moduleId: string,
    field: K,
    value: CourseModule[K],
  ) => {
    const updatedModules = formik.values.modules.map((module) =>
      module.id === moduleId ? { ...module, [field]: value } : module,
    );

    formik.setFieldValue("modules", updatedModules);
  };

  const handleSave = () => {
    formik.handleSubmit();
  };

  const isSaveDisabled =
    formik.values.modules.length === 0 || isPending || !formik.isValid;

  return {
    // course info
    courseId,
    title,
    isLoading,

    // formik
    formik,
    modules: formik.values.modules,

    // dialogs
    isTypeDialogOpen,
    isScheduleDialogOpen,
    openTypeDialog,
    handleTypeDialogChange,
    handleScheduleDialogChange,

    // actions
    handleSelectType,
    handleCancelSchedule,
    handleConfirmSchedule,
    toggleModuleExpand,
    handleChangeDraftTitle,
    handleChangeDraftDate,
    handleChangeModuleField,
    handleSave,

    // derived state
    isSaveDisabled,
  };
};

export default useCourseModulesBuilder;
