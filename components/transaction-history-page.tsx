"use client";

import { useMemo } from "react";
import Link from "next/link";
import useTransactionHistory from "@/hooks/wallet/use-transaction-history";
import useGetUser from "@/hooks/auth/use-get-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Settings,
  Loader2,
  Clock,
  AlertCircle,
  Calculator,
} from "lucide-react";
import type { CreditTransaction, TransactionType } from "@/types/wallet.types";
import { useLanguage } from "@/lib/language-context";

const typeConfig: Record<
  TransactionType,
  { label: string; color: string; icon: typeof ArrowUpCircle }
> = {
  TOPUP: {
    label: "Top Up",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: ArrowUpCircle,
  },
  PURCHASE_WORKSHOP: {
    label: "Pembelian Workshop",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: ArrowDownCircle,
  },
  CALCULATOR_USAGE: {
    label: "Penggunaan Kalkulator",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    icon: Calculator,
  },
  REFUND: {
    label: "Refund",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: RefreshCw,
  },
  ADJUSTMENT: {
    label: "Penyesuaian",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: Settings,
  },
};

function isExpired(validUntil: string | null): boolean {
  if (!validUntil) return false;
  return new Date(validUntil) <= new Date();
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function TransactionItem({ tx }: { tx: CreditTransaction }) {
  const config = typeConfig[tx.type];
  const Icon = config.icon;
  const expired = isExpired(tx.valid_until);
  const isCredit =
    tx.type === "TOPUP" || tx.type === "REFUND" || tx.type === "ADJUSTMENT";
  const { t } = useLanguage();

  const typeLabels: Record<TransactionType, string> = {
    TOPUP: "Top Up",
    PURCHASE_WORKSHOP: t("Pembelian Workshop", "Workshop Purchase"),
    CALCULATOR_USAGE: t("Penggunaan Kalkulator", "Calculator Usage"),
    REFUND: "Refund",
    ADJUSTMENT: t("Penyesuaian", "Adjustment"),
  };

  return (
    <div
      className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
        expired
          ? "border-red-200 bg-red-50/50 opacity-70"
          : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          expired ? "bg-red-100" : isCredit ? "bg-green-100" : "bg-blue-100"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            expired
              ? "text-red-500"
              : isCredit
                ? "text-green-600"
                : "text-blue-600"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={config.color}>
            {typeLabels[tx.type]}
          </Badge>
          {expired && (
            <Badge
              variant="outline"
              className="border-red-300 bg-red-100 text-red-600"
            >
              {t("Kedaluwarsa", "Expired")}
            </Badge>
          )}
        </div>

        {tx.description && (
          <p className="mt-1 truncate text-sm text-slate-600">
            {tx.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDateTime(tx.created_at)}
          </span>
          {tx.valid_until && (
            <span className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {t("Berlaku s/d", "Valid until")} {formatDate(tx.valid_until)}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p
          className={`text-lg font-semibold ${
            expired
              ? "text-red-400 line-through"
              : isCredit
                ? "text-green-600"
                : "text-blue-600"
          }`}
        >
          {isCredit ? "+" : "-"}
          {tx.amount} {t("Kredit", "Credits")}
        </p>
        <p className="text-xs text-slate-400">
          {t("Saldo:", "Balance:")} {tx.balance_after} {t("Kredit", "Credits")}
        </p>
      </div>
    </div>
  );
}

export default function TransactionHistoryPage() {
  const { data: user, isLoading: userLoading } = useGetUser();
  const { data, isLoading, isError } = useTransactionHistory();
  const { t } = useLanguage();

  const stats = useMemo(() => {
    if (!data?.transactions) return null;
    const totalTopup = data.transactions
      .filter((t) => t.type === "TOPUP")
      .reduce((s, t) => s + t.amount, 0);
    const totalSpent = data.transactions
      .filter((t) => t.type === "PURCHASE_WORKSHOP")
      .reduce((s, t) => s + t.amount, 0);
    const expiredCount = data.transactions.filter(
      (t) => t.valid_until && isExpired(t.valid_until) && t.type === "TOPUP",
    ).length;
    return { totalTopup, totalSpent, expiredCount };
  }, [data]);

  if (userLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-600">{t("Silakan login terlebih dahulu.", "Please login first.")}</p>
        <Link
          href="/login"
          className="rounded-lg bg-teal-600 px-6 py-2 text-white hover:bg-teal-700"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-br from-teal-600 to-teal-700 pt-8 pb-24">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-teal-100 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("Kembali ke halaman utama", "Back to home page")}
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Wallet className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {t("Riwayat Transaksi", "Transaction History")}
              </h1>
              <p className="text-teal-100">{t("Kelola dan pantau kredit Anda", "Manage and monitor your credits")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto -mt-16 max-w-4xl px-4 pb-16">
        {/* Balance & Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Wallet className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("Saldo Aktif", "Active Balance")}</p>
                <p className="text-2xl font-bold text-teal-600">
                  {data?.active_balance ?? 0}
                </p>
                <p className="text-xs text-slate-400">{t("Kredit", "Credits")}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("Total Top Up", "Total Top Up")}</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.totalTopup ?? 0}
                </p>
                <p className="text-xs text-slate-400">{t("Kredit", "Credits")}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <ArrowDownCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{t("Total Belanja", "Total Spending")}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.totalSpent ?? 0}
                </p>
                <p className="text-xs text-slate-400">{t("Kredit", "Credits")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expired notice */}
        {stats && stats.expiredCount > 0 && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              <strong>{stats.expiredCount}</strong> {t(
                "transaksi top-up Anda sudah kedaluwarsa dan kreditnya tidak lagi terhitung di saldo aktif.",
                "of your top-up transactions have expired and the credits are no longer counted in your active balance."
              )}
            </p>
          </div>
        )}

        {/* Transaction list */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">{t("Daftar Transaksi", "Transaction List")}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4">
            {isError ? (
              <div className="py-12 text-center">
                <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-400" />
                <p className="text-slate-600">
                  {t("Gagal memuat riwayat transaksi. Silakan coba lagi.", "Failed to load transaction history. Please try again.")}
                </p>
              </div>
            ) : !data?.transactions || data.transactions.length === 0 ? (
              <div className="py-12 text-center">
                <Wallet className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                <p className="text-slate-500">{t("Belum ada transaksi.", "No transactions yet.")}</p>
                <Link
                  href="/paket"
                  className="mt-4 inline-block rounded-lg bg-teal-600 px-6 py-2 text-sm text-white hover:bg-teal-700"
                >
                  {t("Beli Paket Kredit", "Buy Credit Package")}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {data.transactions.map((tx) => (
                  <TransactionItem key={tx.id} tx={tx} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
