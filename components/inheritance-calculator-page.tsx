"use client";

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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Scale,
  Users,
  Wallet,
  FileText,
  Plus,
  Trash2,
  Info,
  AlertCircle,
  BookOpen,
  Download,
  RefreshCw,
  Home,
  HelpCircle,
  Sparkles,
  Loader2,
  Lock,
  Coins,
} from "lucide-react";
import {
  type Gender,
  type MaritalStatus,
  getRelationLabelWithGender,
  getAvailableHeirRelations,
  formatCurrency,
} from "@/lib/inheritance-calculator";
import { useInheritanceCalculator } from "@/hooks/inheritance/use-inheritance-calculator";
import { useLanguage } from "@/lib/language-context";

const TOTAL_STEPS = 5;

export function InheritanceCalculatorPage() {
  const {
    hasLoggedin,
    isLoading,
    currentStep,
    lawSystem,
    setLawSystem,
    deceased,
    setDeceased,
    heirs,
    addHeir,
    updateHeir,
    removeHeir,
    totalEstate,
    setTotalEstate,
    debts,
    setDebts,
    funeralCosts,
    setFuneralCosts,
    wasiat,
    setWasiat,
    result,
    errors,
    resetCalculator,
    nextStep,
    prevStep,
    canProceed,
    progress,
    showCreditConfirm,
    confirmCreditAndCalculate,
    cancelCreditConfirm,
    isCreditDeducting,
  } = useInheritanceCalculator(TOTAL_STEPS);

  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      title: t("Sistem Hukum", "Legal System"),
      icon: Scale,
      description: t("Pilih sistem hukum", "Choose legal system"),
    },
    {
      id: 2,
      title: t("Data Pewaris", "Deceased Data"),
      icon: Users,
      description: t("Info almarhum/ah", "Deceased info"),
    },
    {
      id: 3,
      title: t("Ahli Waris", "Heirs"),
      icon: Users,
      description: t("Daftar ahli waris", "List of heirs"),
    },
    {
      id: 4,
      title: t("Harta & Kewajiban", "Assets & Liabilities"),
      icon: Wallet,
      description: t("Total harta warisan", "Total estate"),
    },
    {
      id: 5,
      title: t("Hasil", "Results"),
      icon: FileText,
      description: t("Lihat pembagian", "View distribution"),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  // Not authenticated - show login prompt
  if (!hasLoggedin) {
    return (
      <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="p-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("Kembali ke Beranda", "Back to Home")}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-8 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Lock className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-slate-900">
                {t("Login Diperlukan", "Login Required")}
              </h2>
              <p className="mb-6 text-slate-600">
                {t(
                  "Anda harus login terlebih dahulu untuk menggunakan Kalkulator Ahli Waris",
                  "You must login first to use the Inheritance Calculator"
                )}
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/login?redirect=/kalkulator-waris">
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    {t("Masuk", "Login")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">{t("Daftar", "Register")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Credit Confirmation Dialog */}
      <Dialog
        open={showCreditConfirm}
        onOpenChange={(open) => !open && cancelCreditConfirm()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              {t("Konfirmasi Penggunaan Kredit", "Confirm Credit Usage")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "Perhitungan kalkulator waris akan memotong kredit dari saldo Anda.",
                "The inheritance calculator will deduct credits from your balance."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-amber-800">
                {t("Biaya Kalkulator Waris", "Inheritance Calculator Fee")}
              </span>
              <span className="text-lg font-bold text-amber-700">
                {t("10 Kredit", "10 Credits")}
              </span>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={cancelCreditConfirm}
              disabled={isCreditDeducting}
            >
              {t("Batal", "Cancel")}
            </Button>
            <Button
              onClick={confirmCreditAndCalculate}
              disabled={isCreditDeducting}
              className="gap-2 bg-teal-500 hover:bg-teal-600"
            >
              {isCreditDeducting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("Memproses...", "Processing...")}
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  {t("Konfirmasi & Hitung", "Confirm & Calculate")}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Header */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("Kembali ke Beranda", "Back to Home")}
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                {t("Kalkulator Ahli Waris", "Inheritance Calculator")}
              </h1>
              <p className="text-slate-300">
                {t(
                  "Hitung pembagian harta warisan dengan mudah dan akurat",
                  "Calculate inheritance distribution easily and accurately"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      currentStep >= step.id
                        ? "bg-teal-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`hidden text-sm font-medium md:block ${
                      currentStep >= step.id
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-3 h-0.5 flex-1 ${
                      currentStep > step.id ? "bg-teal-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Step 1: Law System */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {t("Pilih Sistem Hukum Waris", "Choose Inheritance Legal System")}
                </h2>
                <p className="mx-auto max-w-xl text-slate-600">
                  {t(
                    "Tentukan sistem hukum yang akan digunakan untuk menghitung pembagian warisan",
                    "Select the legal system to calculate inheritance distribution"
                  )}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Islamic Law */}
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    lawSystem === "islam"
                      ? "bg-teal-50 ring-2 ring-teal-500"
                      : "hover:border-teal-300"
                  }`}
                  onClick={() => setLawSystem("islam")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg">
                        <BookOpen className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">
                            {t("Hukum Islam (Faraid)", "Islamic Law (Faraid)")}
                          </h3>
                          {lawSystem === "islam" && (
                            <CheckCircle2 className="h-5 w-5 text-teal-500" />
                          )}
                        </div>
                        <p className="mb-4 text-sm text-slate-600">
                          {t(
                            "Pembagian berdasarkan ketentuan Al-Quran dan Hadits. Setiap ahli waris memiliki bagian yang sudah ditentukan (dzawil furudh) atau sebagai penerima sisa (asabah).",
                            "Distribution based on Al-Quran and Hadith provisions. Each heir has a predetermined share (dzawil furudh) or receives the remainder (asabah)."
                          )}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>
                              {t("Anak laki-laki mendapat 2x anak perempuan", "Sons receive 2x the share of daughters")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>{t("Wasiat maksimal 1/3 harta", "Will limited to 1/3 of estate")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>{t("Mendukung konsep Aul dan Radd", "Supports Aul and Radd concepts")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indonesian Civil Law */}
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    lawSystem === "perdata"
                      ? "bg-teal-50 ring-2 ring-teal-500"
                      : "hover:border-teal-300"
                  }`}
                  onClick={() => setLawSystem("perdata")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg">
                        <Scale className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">
                            {t("Hukum Perdata Indonesia", "Indonesian Civil Law")}
                          </h3>
                          {lawSystem === "perdata" && (
                            <CheckCircle2 className="h-5 w-5 text-teal-500" />
                          )}
                        </div>
                        <p className="mb-4 text-sm text-slate-600">
                          {t(
                            "Pembagian berdasarkan Kitab Undang-Undang Hukum Perdata (KUHPerdata). Ahli waris dibagi dalam 4 golongan dengan prioritas berbeda.",
                            "Distribution based on the Indonesian Civil Code (KUHPerdata). Heirs are divided into 4 groups with different priorities."
                          )}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            <span>{t("Semua anak mendapat bagian sama", "All children receive equal shares")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            <span>{t("Suami/istri setara dengan anak", "Spouse equal to children")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            <span>{t("Sistem 4 golongan ahli waris", "4-tier heir classification system")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Info Box */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div className="text-sm text-blue-800">
                      <p className="mb-1 font-medium">{t("Perbedaan Utama:", "Key Difference:")}</p>
                      <p>
                        {t(
                          "Dalam Hukum Islam, bagian setiap ahli waris sudah ditentukan secara spesifik, sedangkan dalam Hukum Perdata Indonesia, pembagian lebih fleksibel dengan prinsip kesetaraan dalam golongan yang sama.",
                          "In Islamic Law, each heir's share is specifically determined, while in Indonesian Civil Law, distribution is more flexible with the principle of equality within the same group."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Deceased Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {t("Data Pewaris (Almarhum/Almarhumah)", "Deceased Data (The Departed)")}
                </h2>
                <p className="mx-auto max-w-xl text-slate-600">
                  {t(
                    "Masukkan informasi tentang orang yang meninggal dan akan dibagikan hartanya",
                    "Enter information about the deceased whose estate will be distributed"
                  )}
                </p>
              </div>

              <Card>
                <CardContent className="space-y-6 p-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="deceased-name">{t("Nama Pewaris *", "Deceased Name *")}</Label>
                    <Input
                      id="deceased-name"
                      placeholder={t("Masukkan nama almarhum/almarhumah", "Enter the deceased's name")}
                      value={deceased.name}
                      onChange={(e) =>
                        setDeceased({ ...deceased, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label>{t("Jenis Kelamin *", "Gender *")}</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={
                          deceased.gender === "male" ? "default" : "outline"
                        }
                        className={
                          deceased.gender === "male"
                            ? "bg-teal-500 hover:bg-teal-600"
                            : ""
                        }
                        onClick={() =>
                          setDeceased({ ...deceased, gender: "male" })
                        }
                      >
                        {t("Laki-laki", "Male")}
                      </Button>
                      <Button
                        type="button"
                        variant={
                          deceased.gender === "female" ? "default" : "outline"
                        }
                        className={
                          deceased.gender === "female"
                            ? "bg-teal-500 hover:bg-teal-600"
                            : ""
                        }
                        onClick={() =>
                          setDeceased({ ...deceased, gender: "female" })
                        }
                      >
                        {t("Perempuan", "Female")}
                      </Button>
                    </div>
                  </div>

                  {/* Marital Status */}
                  <div className="space-y-2">
                    <Label>{t("Status Pernikahan Terakhir *", "Last Marital Status *")}</Label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {[
                        { value: "married", label: t("Menikah", "Married") },
                        { value: "widowed", label: t("Janda/Duda", "Widowed") },
                        { value: "divorced", label: t("Bercerai", "Divorced") },
                        { value: "single", label: t("Belum Menikah", "Single") },
                      ].map((status) => (
                        <Button
                          key={status.value}
                          type="button"
                          variant={
                            deceased.maritalStatus === status.value
                              ? "default"
                              : "outline"
                          }
                          className={`text-sm ${
                            deceased.maritalStatus === status.value
                              ? "bg-teal-500 hover:bg-teal-600"
                              : ""
                          }`}
                          onClick={() =>
                            setDeceased({
                              ...deceased,
                              maritalStatus: status.value as MaritalStatus,
                            })
                          }
                        >
                          {status.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info about deceased gender impact */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div className="text-sm text-amber-800">
                      <p className="mb-1 font-medium">{t("Penting:", "Important:")}</p>
                      <p>
                        {t(
                          "Jenis kelamin dan status pernikahan pewaris akan mempengaruhi bagian yang diterima ahli waris, terutama untuk suami/istri.",
                          "The deceased's gender and marital status will affect the heirs' shares, especially for the spouse."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Heirs */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {t("Daftar Ahli Waris", "List of Heirs")}
                </h2>
                <p className="mx-auto max-w-xl text-slate-600">
                  {t(
                    `Tambahkan semua ahli waris yang masih hidup dari almarhum/almarhumah ${deceased.name}`,
                    `Add all living heirs of the deceased ${deceased.name}`
                  )}
                </p>
              </div>

              {/* Add Heir Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plus className="h-5 w-5" />
                    {t("Tambah Ahli Waris", "Add Heir")}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "Klik untuk menambahkan ahli waris berdasarkan hubungan keluarga",
                      "Click to add heirs based on family relationship"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {getAvailableHeirRelations(deceased).map((relation) => {
                      // Check if spouse already added
                      const isSpouseAdded = heirs.some(
                        (h) => h.relation === "spouse",
                      );
                      const isDisabled = relation === "spouse" && isSpouseAdded;

                      return (
                        <Button
                          key={relation}
                          variant="outline"
                          size="sm"
                          className="h-auto justify-start py-2 text-xs"
                          onClick={() => addHeir(relation)}
                          disabled={isDisabled}
                        >
                          <Plus className="mr-1 h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {getRelationLabelWithGender(
                              relation,
                              deceased.gender,
                            )}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Heirs List */}
              {heirs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5" />
                      {t("Ahli Waris Terdaftar", "Registered Heirs")} ({heirs.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {heirs.map((heir, index) => (
                      <div
                        key={heir.id}
                        className="flex items-start gap-4 rounded-lg border bg-slate-50 p-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-700">
                          {index + 1}
                        </div>
                        <div className="grid flex-1 gap-4 md:grid-cols-3">
                          <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">
                              {t("Hubungan", "Relationship")}
                            </Label>
                            <Badge variant="secondary">
                              {getRelationLabelWithGender(
                                heir.relation,
                                deceased.gender,
                              )}
                            </Badge>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">
                              {t("Nama (opsional)", "Name (optional)")}
                            </Label>
                            <Input
                              placeholder={t("Nama ahli waris", "Heir's name")}
                              value={heir.name}
                              onChange={(e) =>
                                updateHeir(heir.id, { name: e.target.value })
                              }
                              className="h-9"
                            />
                          </div>
                          {[
                            "son",
                            "daughter",
                            "brother_full",
                            "sister_full",
                            "brother_paternal",
                            "sister_paternal",
                            "brother_maternal",
                            "sister_maternal",
                          ].includes(heir.relation) && (
                            <div className="space-y-1.5">
                              <Label className="text-xs text-slate-500">
                                {t("Jumlah", "Count")}
                              </Label>
                              <Input
                                type="number"
                                min={1}
                                value={heir.count || 1}
                                onChange={(e) =>
                                  updateHeir(heir.id, {
                                    count: Math.max(
                                      1,
                                      parseInt(e.target.value) || 1,
                                    ),
                                  })
                                }
                                className="h-9 w-20"
                              />
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-700"
                          onClick={() => removeHeir(heir.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {heirs.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center">
                    <Users className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                    <p className="text-slate-500">
                      {t("Belum ada ahli waris yang ditambahkan", "No heirs have been added yet")}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {t("Klik tombol di atas untuk menambahkan ahli waris", "Click the button above to add heirs")}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 4: Estate & Debts */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {t("Harta dan Kewajiban", "Assets and Liabilities")}
                </h2>
                <p className="mx-auto max-w-xl text-slate-600">
                  {t(
                    "Masukkan nilai total harta warisan dan kewajiban yang harus dibayar",
                    "Enter the total estate value and liabilities to be paid"
                  )}
                </p>
              </div>

              <Card>
                <CardContent className="space-y-6 p-6">
                  {/* Total Estate */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="total-estate"
                      className="flex items-center gap-2"
                    >
                      <Wallet className="h-4 w-4" />
                      {t("Total Harta Warisan (Bruto) *", "Total Estate (Gross) *")}
                    </Label>
                    <p className="text-sm text-slate-500">
                      {t(
                        "Jumlah seluruh harta pewaris termasuk properti, tabungan, investasi, dll",
                        "All deceased's assets including property, savings, investments, etc."
                      )}
                    </p>
                    <div className="relative">
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500">
                        Rp
                      </span>
                      <Input
                        id="total-estate"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={totalEstate || ""}
                        onChange={(e) => setTotalEstate(Number(e.target.value))}
                      />
                    </div>
                    {totalEstate > 0 && (
                      <p className="text-sm font-medium text-teal-600">
                        {formatCurrency(totalEstate)}
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Debts */}
                  <div className="space-y-2">
                    <Label htmlFor="debts">{t("Hutang Pewaris", "Deceased's Debts")}</Label>
                    <p className="text-sm text-slate-500">
                      {t("Total hutang yang harus dilunasi dari harta warisan", "Total debts to be settled from the estate")}
                    </p>
                    <div className="relative">
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500">
                        Rp
                      </span>
                      <Input
                        id="debts"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={debts || ""}
                        onChange={(e) => setDebts(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Funeral Costs */}
                  <div className="space-y-2">
                    <Label htmlFor="funeral-costs">{t("Biaya Pemakaman", "Funeral Costs")}</Label>
                    <p className="text-sm text-slate-500">
                      {t("Biaya pengurusan jenazah dan pemakaman", "Body handling and burial costs")}
                    </p>
                    <div className="relative">
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500">
                        Rp
                      </span>
                      <Input
                        id="funeral-costs"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={funeralCosts || ""}
                        onChange={(e) =>
                          setFuneralCosts(Number(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* Wasiat */}
                  <div className="space-y-2">
                    <Label htmlFor="wasiat" className="flex items-center gap-2">
                      {t("Wasiat", "Will/Testament")}
                      {lawSystem === "islam" && (
                        <Badge variant="outline" className="text-xs">
                          Max 1/3
                        </Badge>
                      )}
                    </Label>
                    <p className="text-sm text-slate-500">
                      {t("Harta yang diwasiatkan kepada pihak di luar ahli waris", "Assets bequeathed to parties outside the heirs")}
                      {lawSystem === "islam" &&
                        t(" (dalam hukum Islam dibatasi maksimal 1/3 dari harta bersih)", " (in Islamic law, limited to maximum 1/3 of net estate)")}
                    </p>
                    <div className="relative">
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500">
                        Rp
                      </span>
                      <Input
                        id="wasiat"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={wasiat || ""}
                        onChange={(e) => setWasiat(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Net Estate Preview */}
                  <div className="rounded-lg bg-teal-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-teal-700">
                          {t("Perkiraan Harta Bersih", "Estimated Net Estate")}
                        </p>
                        <p className="text-xs text-teal-600">
                          {t("Setelah dikurangi hutang, biaya, dan wasiat", "After deducting debts, costs, and will")}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-teal-700">
                        {formatCurrency(
                          Math.max(
                            0,
                            totalEstate - debts - funeralCosts - wasiat,
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Validation Errors */}
              {errors.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div>
                        <p className="mb-2 font-medium text-red-800">
                          {t("Mohon perbaiki kesalahan berikut:", "Please fix the following errors:")}
                        </p>
                        <ul className="space-y-1 text-sm text-red-700">
                          {errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 5: Result */}
          {currentStep === 5 && result && (
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <Sparkles className="h-8 w-8 text-teal-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {t("Hasil Perhitungan Waris", "Inheritance Calculation Results")}
                </h2>
                <p className="mx-auto max-w-xl text-slate-600">
                  {t("Berdasarkan", "Based on")}{" "}
                  {lawSystem === "islam"
                    ? t("Hukum Islam (Faraid)", "Islamic Law (Faraid)")
                    : t("Hukum Perdata Indonesia", "Indonesian Civil Law")}
                </p>
              </div>

              {/* Summary Card */}
              <Card className="bg-linear-to-br from-teal-500 to-teal-600 text-white">
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-teal-100">{t("Pewaris", "Deceased")}</p>
                      <p className="text-xl font-bold">{deceased.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-teal-100">{t("Harta Bersih", "Net Estate")}</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(result.netEstate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-teal-100">{t("Jumlah Ahli Waris", "Number of Heirs")}</p>
                      <p className="text-xl font-bold">
                        {result.shares.length} {t("orang", "people")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <div>
                        <p className="mb-2 font-medium text-amber-800">
                          {t("Catatan Penting:", "Important Notes:")}
                        </p>
                        <ul className="space-y-1 text-sm text-amber-700">
                          {result.warnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Shares Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t("Pembagian Harta Warisan", "Estate Distribution")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.shares.map((share, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg border bg-slate-50 p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 font-medium text-teal-700">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <p className="font-medium text-slate-900">
                              {share.heir.name ||
                                getRelationLabelWithGender(
                                  share.heir.relation,
                                  deceased.gender,
                                )}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {getRelationLabelWithGender(
                                share.heir.relation,
                                deceased.gender,
                              )}
                            </Badge>
                            {(share.heir.count || 1) > 1 && (
                              <Badge className="bg-slate-200 text-xs text-slate-700">
                                {share.heir.count} {t("orang", "people")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">
                            {share.explanation}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm text-slate-500">
                            {share.fraction} ({share.percentage.toFixed(2)}%)
                          </p>
                          <p className="text-lg font-bold text-teal-600">
                            {formatCurrency(share.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Explanations */}
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="explanations">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      <span>{t("Penjelasan Perhitungan", "Calculation Explanation")}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {result.explanations.map((exp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t("Hitung Ulang", "Recalculate")}
                </Button>
                <Button className="gap-2 bg-teal-500 hover:bg-teal-600">
                  <Download className="h-4 w-4" />
                  {t("Unduh Hasil (PDF)", "Download Results (PDF)")}
                </Button>
                <Link href="/">
                  <Button variant="outline" className="gap-2">
                    <Home className="h-4 w-4" />
                    {t("Kembali ke Beranda", "Back to Home")}
                  </Button>
                </Link>
              </div>

              {/* Disclaimer */}
              <Card className="border-slate-200 bg-slate-100">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
                    <div className="text-sm text-slate-600">
                      <p className="mb-1 font-medium">{t("Disclaimer:", "Disclaimer:")}</p>
                      <p>
                        {t(
                          "Hasil perhitungan ini bersifat simulasi dan hanya untuk referensi. Untuk kepastian hukum, silakan berkonsultasi dengan ahli waris, notaris, atau pengacara yang berwenang. Setiap kasus waris mungkin memiliki kompleksitas tersendiri yang memerlukan analisis lebih lanjut.",
                          "This calculation is a simulation and for reference only. For legal certainty, please consult with heirs, a notary, or an authorized lawyer. Each inheritance case may have its own complexities that require further analysis."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="mt-8 flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("Sebelumnya", "Previous")}
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="gap-2 bg-teal-500 hover:bg-teal-600"
              >
                {currentStep === 4 ? (
                  <>
                    <Calculator className="h-4 w-4" />
                    {t("Hitung Sekarang", "Calculate Now")}
                  </>
                ) : (
                  <>
                    {t("Selanjutnya", "Next")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Guide Section */}
      <div id="panduan" className="border-t bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-2xl font-bold text-slate-900">
                {t("Panduan Penggunaan", "User Guide")}
              </h2>
              <p className="text-slate-600">
                {t(
                  "Berikut adalah langkah-langkah untuk menggunakan kalkulator ahli waris",
                  "Here are the steps to use the inheritance calculator"
                )}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5 text-emerald-500" />
                    {t("Hukum Islam (Faraid)", "Islamic Law (Faraid)")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>
                    {t(
                      "Dalam hukum waris Islam, pembagian diatur berdasarkan Al-Quran Surah An-Nisa ayat 11-12. Ada dua jenis ahli waris:",
                      "In Islamic inheritance law, distribution is regulated based on Al-Quran Surah An-Nisa verses 11-12. There are two types of heirs:"
                    )}
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <strong>Dzawil Furudh:</strong> {t("Ahli waris dengan bagian tetap", "Heirs with fixed shares")}
                    </li>
                    <li>
                      <strong>Asabah:</strong> {t("Ahli waris yang menerima sisa", "Heirs who receive the remainder")}
                    </li>
                  </ul>
                  <p>
                    {t(
                      "Prinsip utama: anak laki-laki mendapat 2x bagian anak perempuan.",
                      "Main principle: sons receive 2x the share of daughters."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Scale className="h-5 w-5 text-blue-500" />
                    {t("Hukum Perdata Indonesia", "Indonesian Civil Law")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>
                    {t("Berdasarkan KUHPerdata, ahli waris dibagi dalam 4 golongan:", "Based on KUHPerdata, heirs are divided into 4 groups:")}
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <strong>{t("Golongan I:", "Group I:")}</strong> {t("Suami/istri & anak-anak", "Spouse & children")}
                    </li>
                    <li>
                      <strong>{t("Golongan II:", "Group II:")}</strong> {t("Orang tua & saudara", "Parents & siblings")}
                    </li>
                    <li>
                      <strong>{t("Golongan III:", "Group III:")}</strong> {t("Kakek/nenek", "Grandparents")}
                    </li>
                    <li>
                      <strong>{t("Golongan IV:", "Group IV:")}</strong> {t("Keluarga sedarah lainnya", "Other blood relatives")}
                    </li>
                  </ul>
                  <p>
                    {t(
                      "Golongan yang lebih tinggi menghalangi golongan di bawahnya.",
                      "Higher groups exclude lower groups from inheritance."
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
