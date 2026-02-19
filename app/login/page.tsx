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
} from "lucide-react";
import useLogin from "@/hooks/auth/use-login";
import Image from "next/image";

export default function LoginPage() {
  const { formik, showPassword, toggleShowPassword, isLoading } = useLogin();
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br bg-white shadow-lg">
              <Image
                className="text-white"
                src={"/logo.png"}
                height={64}
                width={64}
                alt="Logo DHSI"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">DHSI</h1>
            <p className="text-slate-400">Dewan Hukum Siber Indonesia</p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-2xl">Masuk</CardTitle>
              <CardDescription className="text-center">
                Masuk ke akun Anda untuk mengakses semua fitur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Error Message */}
                {formik.errors.email && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{formik.errors.email}</span>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="nama@email.com"
                      className="pl-10"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-teal-600 hover:underline"
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10 pl-10"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600"
                  disabled={formik.isSubmitting || isLoading}
                >
                  {formik.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </Button>

                {/* Demo Credentials */}
                <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
                  <p className="mb-2 font-medium text-slate-700">Demo Akun:</p>
                  <div className="space-y-1 text-slate-600">
                    <p>
                      <span className="font-medium">User:</span> user@dhsi.com /
                      password123
                    </p>
                    <p>
                      <span className="font-medium">Admin:</span> admin@dhsi.com
                      / password123
                    </p>
                  </div>
                </div>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center text-sm">
                <span className="text-slate-500">Belum punya akun? </span>
                <Link
                  href="/register"
                  className="font-medium text-teal-600 hover:underline"
                >
                  Daftar sekarang
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
