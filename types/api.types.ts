// API Response Types
export interface APIResponse<T = unknown> {
  status: "success" | "error";
  message: string;
  data?: T;
  errors?: unknown;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error Codes (mirror backend)
export enum ErrorCode {
  // General errors
  INTERNAL_ERROR = 5000,
  VALIDATION_ERROR = 5001,
  NOT_FOUND = 5002,
  FORBIDDEN = 5003,
  BAD_REQUEST = 5004,
  
  // Auth errors
  UNAUTHORIZED = 1000,
  INVALID_CREDENTIALS = 1001,
  USER_EXISTS = 1002,
  TOKEN_EXPIRED = 1003,
  TOKEN_INVALID = 1004,
  SESSION_EXPIRED = 1005,
  
  // Membership errors
  MEMBERSHIP_NOT_FOUND = 2000,
  MEMBERSHIP_EXPIRED = 2001,
  MEMBERSHIP_REQUIRED = 2002,
  INSUFFICIENT_MEMBERSHIP = 2003,
  ALREADY_SUBSCRIBED = 2004,
  SUBSCRIPTION_NOT_FOUND = 2005,
  
  // Training errors
  TRAINING_NOT_FOUND = 3000,
  TRAINING_NOT_ACCESSIBLE = 3001,
  
  // Exam errors
  EXAM_NOT_FOUND = 4000,
  EXAM_TIME_EXPIRED = 4004,
  MAX_ATTEMPTS_REACHED = 4005,
}

// Membership Types
export type MembershipTier = "basic" | "pro" | "elite";

export interface MembershipPlan {
  id: string;
  name: string;
  tier: MembershipTier;
  price: number;
  description: string;
  features: string[];
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserMembership {
  id: string;
  user_id: string;
  plan_id: string;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  plan: MembershipPlan;
  created_at: string;
  updated_at: string;
}

// Training Types
export type TrainingType = "video_exam" | "video_discussion" | "live_exam" | "exam_only";
export type TrainingStatus = "draft" | "published" | "archived";

export interface Training {
  id: string;
  author_id: string;
  title: string;
  description: string;
  short_description: string;
  thumbnail_url?: string;
  // Some endpoints return `thumbnail` (not `thumbnail_url`)
  thumbnail?: string;
  training_type: TrainingType;
  status: TrainingStatus;
  video_urls: string[];
  zoom_link?: string;
  scheduled_at?: string;
  duration_minutes?: number;
  whatsapp_link?: string;
  discussion_schedule?: string;
  required_plan_id?: string;
  required_plan?: {
    id: string;
    name: string;
    tier: MembershipTier;
  };
  author?: {
    id: string;
    username: string;
  };
  modules?: TrainingModule[];
  // Some user-facing endpoints include exams directly
  exams?: Exam[];
  live_sessions?: LiveSession[];
  _count?: {
    modules: number;
    exams: number;
    user_trainings: number;
  };
  created_at: string;
  updated_at: string;
  // Extended fields for user view
  has_access?: boolean;
  access_message?: string;
  user_progress?: UserTraining;
  // Some user-facing endpoints flatten progress/enrollment flags
  progress?: number;
  is_enrolled?: boolean;
}

export interface TrainingModule {
  id: string;
  training_id: string;
  title: string;
  description?: string;
  video_url?: string;
  duration?: number;
  // Some endpoints use `duration_minutes` naming
  duration_minutes?: number;
  order: number;
  // Module type and exam linkage (user-facing payloads)
  module_type?: string;
  exam_id?: string | null;
  // Some endpoints flatten completion state
  is_completed?: boolean;
  created_at: string;
  updated_at: string;
  // Progress
  progress?: ModuleProgress;
}

export interface ModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  is_completed: boolean;
  watch_time: number;
  last_position: number;
}

export interface LiveSession {
  id: string;
  training_id: string;
  title: string;
  description?: string;
  zoom_link: string;
  scheduled_at: string;
  duration_minutes: number;
  is_recording_available: boolean;
  recording_url?: string;
}

export interface UserTraining {
  id: string;
  user_id: string;
  training_id: string;
  progress: number;
  is_completed: boolean;
  last_accessed: string;
  training?: Training;
}

// Exam Types
export type ExamStatus = "not_started" | "in_progress" | "completed" | "expired";

export interface Exam {
  id: string;
  training_id?: string;
  title: string;
  description?: string;
  duration_minutes: number;
  passing_score: number;
  max_attempts: number;
  is_published: boolean;
  training?: {
    id: string;
    title: string;
    required_plan_id?: string;
  };
  questions?: ExamQuestion[];
  _count?: {
    questions: number;
    attempts?: number;
  };
  created_at: string;
  updated_at: string;
  // Extended for user
  attempt_count?: number;
  has_active_attempt?: boolean;
  best_score?: number;
  can_attempt?: boolean;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question: string;
  options: string[];
  correct_idx?: number; // Only visible to admin
  points: number;
  order: number;
}

export interface ExamAttempt {
  id: string;
  user_id: string;
  exam_id: string;
  status: ExamStatus;
  started_at?: string;
  finished_at?: string;
  score?: number;
  is_passed?: boolean;
  exam?: Exam;
  answers?: ExamAnswer[];
}

export interface ExamAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_idx?: number;
  is_correct?: boolean;
}

export interface ExamStartResult {
  attempt: ExamAttempt;
  questions: ExamQuestion[];
  remaining_seconds: number;
  is_resumed: boolean;
}

export interface ExamSubmitResult {
  attempt: ExamAttempt;
  score: number;
  is_passed: boolean;
  correct_count: number;
  total_questions: number;
  passing_score: number;
}

// User Types
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Certificate Types
export interface Certificate {
  id: string;
  user_id: string;
  training_id?: string;
  exam_id?: string;
  certificate_number: string;
  issued_at: string;
  certificate_url?: string;
}
