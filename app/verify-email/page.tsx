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
import { ArrowLeft, Mail, Loader2, Scale, RefreshCw } from "lucide-react";
import useVerification from "@/hooks/auth/use-verification";

export default function VerifyEmailPage() {
  const {
    code,
    cooldown,
    isVerifying,
    isResending,
    handleCodeChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,
  } = useVerification();

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="p-4">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Login
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-teal-400 to-teal-600 shadow-lg">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">DHSI</h1>
            <p className="text-slate-400">Dewan Hukum Siber Indonesia</p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                <Mail className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-center text-2xl">
                Verifikasi Email
              </CardTitle>
              <CardDescription className="text-center">
                Kami telah mengirimkan kode verifikasi 6 digit ke email Anda.
                Masukkan kode tersebut di bawah ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* OTP Input */}
              <div className="mb-6">
                <div
                  className="flex justify-center gap-2"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-14 w-12 text-center text-xl font-bold focus:border-teal-500 focus:ring-teal-500"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-teal-500 hover:bg-teal-600"
                disabled={!isCodeComplete || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  "Verifikasi"
                )}
              </Button>

              {/* Resend */}
              <div className="mt-6 text-center">
                <p className="mb-2 text-sm text-slate-500">
                  Tidak menerima kode?
                </p>
                <button
                  onClick={handleResend}
                  disabled={cooldown > 0 || isResending}
                  className="inline-flex items-center text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      Mengirim...
                    </>
                  ) : cooldown > 0 ? (
                    <>
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Kirim ulang ({cooldown}s)
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Kirim Ulang Kode
                    </>
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 rounded-lg bg-slate-50 p-3 text-sm">
                <p className="text-slate-600">
                  <span className="font-medium">Tips:</span> Cek folder{" "}
                  <span className="font-medium">Inbox</span> dan{" "}
                  <span className="font-medium">Spam</span> di email Anda. Kode
                  berlaku selama 10 menit.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
