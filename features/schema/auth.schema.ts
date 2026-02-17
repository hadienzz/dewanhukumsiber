import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(2, "Nama harus terdiri dari minimal 2 karakter")
    .required("Nama wajib diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  phone: Yup.string()
    .matches(/^\d+$/, "Nomor telepon hanya boleh berisi angka")
    .required("Nomor telepon wajib diisi"),
  password: Yup.string()
    .min(6, "Password harus terdiri dari minimal 6 karakter")
    .required("Password wajib diisi"),
});
