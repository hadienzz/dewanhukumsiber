"use client";

import Link from "next/link";
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
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Scale,
  AlertCircle,
  User,
  Phone,
} from "lucide-react";
import useRegister from "@/hooks/auth/use-register";

export default function RegisterPage() {
  const {
    formik,
    showPassword,
    toggleShowPassword,
    isLoading,
    registerIsDisabled,
  } = useRegister();

  const hasFormError =
    formik.submitCount > 0 && Object.keys(formik.errors).length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-300 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-teal-400 to-teal-600">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">DHSI</h1>
            <p className="text-slate-400">Digital Hukum & Security Indonesia</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Daftar Akun</CardTitle>
              <CardDescription className="text-center">
                Buat akun baru untuk mengakses semua fitur
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Global Error */}
                {hasFormError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span>Mohon periksa kembali form</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="username"
                      placeholder="Nama lengkap"
                      className="pl-10"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="email"
                      type="email"
                      className="pl-10"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label>Nomor Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="phone"
                      className="pl-10"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="pr-10 pl-10"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={registerIsDisabled}
                  className="w-full bg-teal-500 hover:bg-teal-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Daftar"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-slate-500">Sudah punya akun? </span>
                <Link href="/login" className="font-medium text-teal-600">
                  Masuk
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
