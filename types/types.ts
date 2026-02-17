import { string } from "yup";

export type RegisterUserPayload = {
  username: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type ApiResponse = {
  status: string;
  message: string;
  data?: any;
};

export type MyResponse = {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
};

export interface CreateWorkshopFormValues {
  title: string;
  short_description: string;
  description: string;
  category: string;
  thumbnail: File | null;
  credit_price: number;
  benefits: string[];
}

export interface CreateWorkshopRequestPayload {
  title: string;
  short_description: string;
  description: string;
  category: string;
  thumbnail: File | null;
  credit_price: number; // NUMBER
  benefits: string[];
}

export type CreditPackage = {
  id: string;
  name: string;
  price: number;
  credits?: number;
  bonus?: number;
  bonusLabel?: string;
  validity: string;
  highlight?: "popular" | "best";
  description?: string;
  isCustom?: boolean;
};
