import axiosInstance from "@/lib/axios";
import {
  APIResponse,
  Exam,
  ExamQuestion,
  ExamAttempt,
  ExamStartResult,
  ExamSubmitResult,
} from "@/types/api.types";

// Extended Exam type with user's attempt info
export interface ExamWithAttemptInfo extends Exam {
  attempt_count: number;
  best_score?: number;
  can_attempt: boolean;
  _count?: {
    questions: number;
  };
}

// ==================
// MEMBER APIs
// ==================

export async function getMyExams(): Promise<APIResponse<{ exams: ExamWithAttemptInfo[] }>> {
  const { data } = await axiosInstance.get<APIResponse<{ exams: ExamWithAttemptInfo[] }>>(
    "/api/exams/my"
  );
  return data;
}

export async function getExamForUser(
  examId: string
): Promise<APIResponse<{ exam: ExamWithAttemptInfo }>> {
  const { data } = await axiosInstance.get<APIResponse<{ exam: ExamWithAttemptInfo }>>(
    `/api/exams/${examId}`
  );
  return data;
}

export async function startExam(
  examId: string
): Promise<APIResponse<ExamStartResult>> {
  const { data } = await axiosInstance.post<APIResponse<ExamStartResult>>(
    `/api/exams/${examId}/start`
  );
  return data;
}

export interface SaveAnswerPayload {
  question_id: string;
  selected_idx: number;
}

export async function saveExamAnswer(
  attemptId: string,
  payload: SaveAnswerPayload
): Promise<APIResponse<{ answer: { id: string } }>> {
  const { data } = await axiosInstance.post<APIResponse<{ answer: { id: string } }>>(
    `/api/exams/attempts/${attemptId}/answer`,
    payload
  );
  return data;
}

export async function submitExam(
  attemptId: string
): Promise<APIResponse<ExamSubmitResult>> {
  const { data } = await axiosInstance.post<APIResponse<ExamSubmitResult>>(
    `/api/exams/attempts/${attemptId}/submit`
  );
  return data;
}

export async function getAttemptResult(
  attemptId: string
): Promise<APIResponse<{ attempt: ExamAttempt; score: number; is_passed: boolean; passing_score: number }>> {
  const { data } = await axiosInstance.get<APIResponse<{ attempt: ExamAttempt; score: number; is_passed: boolean; passing_score: number }>>(
    `/api/exams/attempts/${attemptId}/result`
  );
  return data;
}

export async function getMyExamResults(): Promise<APIResponse<{ results: ExamAttempt[] }>> {
  const { data } = await axiosInstance.get<APIResponse<{ results: ExamAttempt[] }>>(
    "/api/exams/my/results"
  );
  return data;
}

export async function reportTabChange(
  attemptId: string
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.post<APIResponse<null>>(
    "/api/exams/report/tab-change",
    {
      attempt_id: attemptId,
      timestamp: new Date().toISOString(),
    }
  );
  return data;
}

// ==================
// ADMIN APIs
// ==================

export interface GetExamsParams {
  page?: number;
  limit?: number;
  trainingId?: string;
  published?: boolean;
}

export async function getAllExams(
  params?: GetExamsParams
): Promise<APIResponse<Exam[]>> {
  const { data } = await axiosInstance.get<APIResponse<Exam[]>>(
    "/api/exams/admin/all",
    { params }
  );
  return data;
}

export async function getExamByIdAdmin(
  examId: string
): Promise<APIResponse<{ exam: Exam }>> {
  const { data } = await axiosInstance.get<APIResponse<{ exam: Exam }>>(
    `/api/exams/admin/${examId}`
  );
  return data;
}

export interface CreateExamPayload {
  training_id?: string;
  title: string;
  description?: string;
  duration_minutes: number;
  passing_score: number;
  max_attempts?: number;
}

export async function createExam(
  payload: CreateExamPayload
): Promise<APIResponse<{ exam: Exam }>> {
  const { data } = await axiosInstance.post<APIResponse<{ exam: Exam }>>(
    "/api/exams/admin",
    payload
  );
  return data;
}

export async function updateExam(
  examId: string,
  payload: Partial<CreateExamPayload & { is_published: boolean }>
): Promise<APIResponse<{ exam: Exam }>> {
  const { data } = await axiosInstance.patch<APIResponse<{ exam: Exam }>>(
    `/api/exams/admin/${examId}`,
    payload
  );
  return data;
}

export async function publishExam(
  examId: string
): Promise<APIResponse<{ exam: Exam }>> {
  const { data } = await axiosInstance.post<APIResponse<{ exam: Exam }>>(
    `/api/exams/admin/${examId}/publish`
  );
  return data;
}

export async function deleteExam(examId: string): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/exams/admin/${examId}`
  );
  return data;
}

// Question APIs
export async function getExamQuestions(
  examId: string
): Promise<APIResponse<{ questions: ExamQuestion[] }>> {
  const { data } = await axiosInstance.get<APIResponse<{ questions: ExamQuestion[] }>>(
    `/api/exams/admin/${examId}/questions`
  );
  return data;
}

export interface CreateQuestionPayload {
  question: string;
  options: string[];
  correct_idx: number;
  points?: number;
  order: number;
}

export async function createQuestion(
  examId: string,
  payload: CreateQuestionPayload
): Promise<APIResponse<{ question: ExamQuestion }>> {
  const { data } = await axiosInstance.post<APIResponse<{ question: ExamQuestion }>>(
    `/api/exams/admin/${examId}/questions`,
    payload
  );
  return data;
}

export async function updateQuestion(
  questionId: string,
  payload: Partial<CreateQuestionPayload>
): Promise<APIResponse<{ question: ExamQuestion }>> {
  const { data } = await axiosInstance.patch<APIResponse<{ question: ExamQuestion }>>(
    `/api/exams/admin/questions/${questionId}`,
    payload
  );
  return data;
}

export async function deleteQuestion(questionId: string): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.delete<APIResponse<null>>(
    `/api/exams/admin/questions/${questionId}`
  );
  return data;
}

export async function bulkCreateQuestions(
  examId: string,
  questions: CreateQuestionPayload[]
): Promise<APIResponse<null>> {
  const { data } = await axiosInstance.post<APIResponse<null>>(
    `/api/exams/admin/${examId}/questions/bulk`,
    { questions }
  );
  return data;
}

// Results APIs
export interface ExamResultWithUser extends ExamAttempt {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ExamStatistics {
  totalAttempts: number;
  averageScore: number | null;
  highestScore: number | null;
  lowestScore: number | null;
  passedCount: number;
  passRate: number;
}

export async function getExamResults(
  examId: string,
  params?: { page?: number; limit?: number }
): Promise<APIResponse<ExamResultWithUser[]> & { statistics?: ExamStatistics }> {
  const { data } = await axiosInstance.get<APIResponse<ExamResultWithUser[]> & { statistics?: ExamStatistics }>(
    `/api/exams/admin/${examId}/results`,
    { params }
  );
  return data;
}
