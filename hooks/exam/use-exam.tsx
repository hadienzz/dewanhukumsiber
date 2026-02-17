"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMyExams,
  getExamForUser,
  startExam,
  saveExamAnswer,
  submitExam,
  getAttemptResult,
  getMyExamResults,
  reportTabChange,
  SaveAnswerPayload,
} from "@/services/exam";
import { getErrorMessage } from "@/utils/error";
import { ExamQuestion } from "@/types/api.types";

// ==================
// QUERIES
// ==================

export const useMyExams = () => {
  return useQuery({
    queryKey: ["exams", "my"],
    queryFn: async () => {
      const response = await getMyExams();
      return response.data?.exams ?? [];
    },
  });
};

export const useExamInfo = (examId: string) => {
  return useQuery({
    queryKey: ["exams", examId],
    queryFn: async () => {
      const response = await getExamForUser(examId);
      return response.data?.exam ?? null;
    },
    enabled: !!examId,
  });
};

export const useAttemptResult = (attemptId: string) => {
  return useQuery({
    queryKey: ["exams", "attempts", attemptId, "result"],
    queryFn: async () => {
      const response = await getAttemptResult(attemptId);
      return response.data ?? null;
    },
    enabled: !!attemptId,
  });
};

export const useMyExamResults = () => {
  return useQuery({
    queryKey: ["exams", "my", "results"],
    queryFn: async () => {
      const response = await getMyExamResults();
      return response.data?.results ?? [];
    },
  });
};

// ==================
// EXAM SESSION HOOK (Anti-cheat features)
// ==================

interface ExamSessionState {
  attemptId: string | null;
  questions: ExamQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  remainingSeconds: number;
  isSubmitting: boolean;
  isStarted: boolean;
  tabChangeWarnings: number;
}

export const useExamSession = (examId: string) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState<ExamSessionState>({
    attemptId: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    remainingSeconds: 0,
    isSubmitting: false,
    isStarted: false,
    tabChangeWarnings: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_TAB_WARNINGS = 3;

  // Start exam mutation
  const startMutation = useMutation({
    mutationFn: () => startExam(examId),
    onSuccess: (response) => {
      const data = response.data;
      if (data) {
        setState((prev) => ({
          ...prev,
          attemptId: data.attempt.id,
          questions: data.questions,
          remainingSeconds: data.remaining_seconds,
          isStarted: true,
        }));

        if (data.is_resumed) {
          toast.info("Melanjutkan ujian yang tertunda");
        }
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal memulai ujian"));
    },
  });

  // Save answer mutation
  const saveAnswerMutation = useMutation({
    mutationFn: (payload: SaveAnswerPayload) =>
      saveExamAnswer(state.attemptId!, payload),
    onError: (error) => {
      console.error("Failed to save answer:", error);
    },
  });

  // Submit exam mutation
  const submitMutation = useMutation({
    mutationFn: () => submitExam(state.attemptId!),
    onSuccess: (response) => {
      setState((prev) => ({ ...prev, isSubmitting: false }));
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      queryClient.invalidateQueries({ queryKey: ["exams", "my", "results"] });
      
      const result = response.data;
      if (result?.is_passed) {
        toast.success(`Selamat! Anda lulus dengan skor ${result.score.toFixed(1)}%`);
      } else {
        toast.error(`Skor Anda: ${result?.score.toFixed(1)}%. Nilai minimal: ${result?.passing_score}%`);
      }
      
      return response;
    },
    onError: (error) => {
      setState((prev) => ({ ...prev, isSubmitting: false }));
      toast.error(getErrorMessage(error, "Gagal mengirim jawaban"));
    },
  });

  // Timer countdown
  useEffect(() => {
    if (state.isStarted && state.remainingSeconds > 0 && !state.isSubmitting) {
      timerRef.current = setInterval(() => {
        setState((prev) => {
          const newRemaining = prev.remainingSeconds - 1;
          if (newRemaining <= 0) {
            // Auto submit when time is up
            handleSubmit();
            return { ...prev, remainingSeconds: 0 };
          }
          return { ...prev, remainingSeconds: newRemaining };
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [state.isStarted, state.isSubmitting]);

  // Tab change detection
  useEffect(() => {
    if (!state.isStarted || !state.attemptId) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setState((prev) => {
          const newWarnings = prev.tabChangeWarnings + 1;
          
          // Report to backend
          reportTabChange(prev.attemptId!).catch(console.error);
          
          if (newWarnings >= MAX_TAB_WARNINGS) {
            toast.error("Terlalu banyak berganti tab. Ujian akan disubmit.");
            handleSubmit();
          } else {
            toast.warning(
              `Peringatan ${newWarnings}/${MAX_TAB_WARNINGS}: Jangan berpindah tab selama ujian!`
            );
          }
          
          return { ...prev, tabChangeWarnings: newWarnings };
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [state.isStarted, state.attemptId]);

  // Disable right click and copy
  useEffect(() => {
    if (!state.isStarted) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning("Klik kanan dinonaktifkan selama ujian");
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      toast.warning("Copy dinonaktifkan selama ujian");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+A, F12, etc.
      if (
        (e.ctrlKey && ["c", "v", "a", "u"].includes(e.key.toLowerCase())) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault();
        toast.warning("Shortcut ini dinonaktifkan selama ujian");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.isStarted]);

  // Actions
  const handleStart = useCallback(() => {
    startMutation.mutate();
  }, [startMutation]);

  const handleSelectAnswer = useCallback(
    (questionId: string, selectedIdx: number) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: selectedIdx },
      }));

      // Save to backend
      saveAnswerMutation.mutate({ question_id: questionId, selected_idx: selectedIdx });
    },
    [saveAnswerMutation]
  );

  const handleNextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1),
    }));
  }, []);

  const handlePrevQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  }, []);

  const handleGoToQuestion = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(index, prev.questions.length - 1)),
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (state.isSubmitting) return;
    setState((prev) => ({ ...prev, isSubmitting: true }));
    submitMutation.mutate();
  }, [state.isSubmitting, submitMutation]);

  // Format time
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    // State
    ...state,
    currentQuestion: state.questions[state.currentQuestionIndex],
    totalQuestions: state.questions.length,
    answeredCount: Object.keys(state.answers).length,
    formattedTime: formatTime(state.remainingSeconds),
    isTimeWarning: state.remainingSeconds < 60 && state.remainingSeconds > 0,
    isTimeCritical: state.remainingSeconds < 30 && state.remainingSeconds > 0,
    
    // Loading states
    isStarting: startMutation.isPending,
    
    // Result
    submitResult: submitMutation.data?.data,
    isSubmitted: submitMutation.isSuccess,
    
    // Actions
    handleStart,
    handleSelectAnswer,
    handleNextQuestion,
    handlePrevQuestion,
    handleGoToQuestion,
    handleSubmit,
  };
};

// ==================
// ADMIN HOOKS
// ==================

interface AdminExamParams {
  page?: number;
  limit?: number;
  trainingId?: string;
  isPublished?: boolean;
}

export const useAdminExams = (params?: AdminExamParams) => {
  return useQuery({
    queryKey: ["admin", "exams", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.set("page", params.page.toString());
      if (params?.limit) queryParams.set("limit", params.limit.toString());
      if (params?.trainingId) queryParams.set("training_id", params.trainingId);
      if (params?.isPublished !== undefined) queryParams.set("is_published", String(params.isPublished));
      
      const response = await fetch(`/api/exams/admin/all?${queryParams.toString()}`);
      const data = await response.json();
      return {
        exams: data.data?.exams ?? [],
        total: data.data?.total ?? 0,
        page: data.data?.page ?? 1,
        limit: data.data?.limit ?? 10,
        totalPages: data.data?.totalPages ?? 1,
      };
    },
  });
};

export const usePublishExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (examId: string) => {
      const response = await fetch(`/api/exams/admin/${examId}/publish`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to publish");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Ujian berhasil dipublish");
      queryClient.invalidateQueries({ queryKey: ["admin", "exams"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal publish ujian"));
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (examId: string) => {
      const response = await fetch(`/api/exams/admin/${examId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Ujian berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["admin", "exams"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Gagal menghapus ujian"));
    },
  });
};