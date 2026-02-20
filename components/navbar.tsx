"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Calculator,
  BookOpen,
  Shield,
  Wallet,
  Package,
  GraduationCap,
  Handshake,
  Award,
  Scale,
  ChevronDown,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useGetUser from "@/hooks/auth/use-get-user";
import logout from "@/services/auth/logout";
import useLogout from "@/hooks/auth/use-logout";
import { useLanguage } from "@/lib/language-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: user, isLoading, hasLoggedin } = useGetUser();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="border-border bg-background sticky top-0 z-50 w-full border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-between gap-2">
            <Image
              src={"/logo.webp"}
              alt="Dewan Hukum Siber Indonesia Logo"
              width={48}
              height={48}
            />
            <span className="text-foreground hidden text-xl font-bold sm:inline">
              {t("Dewan Hukum Siber Indonesia", "Indonesian Cyber Law Council")}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/paket"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Package className="h-4 w-4" />
              {t("Paket", "Packages")}
            </Link>
            {/* Dropdown Anggota */}
            <div className="group relative">
              <button className="text-foreground hover:text-primary flex items-center gap-1 transition">
                <Users className="h-4 w-4" />
                {t("Anggota", "Members")}
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="pointer-events-none absolute top-full left-0 z-50 mt-2 w-48 rounded-lg border bg-white py-1 opacity-0 shadow-lg transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                <Link
                  href="/advokat"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Scale className="h-4 w-4" />
                  {t("Advokat", "Lawyer")}
                </Link>
                <Link
                  href="/keanggotaan"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Award className="h-4 w-4" />
                  {t("Anggota", "Members")}
                </Link>
                <Link
                  href="/paralegal"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Shield className="h-4 w-4" />
                  Paralegal
                </Link>
              </div>
            </div>
            <Link
              href="/kalkulator-waris"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Calculator className="h-4 w-4" />
              {t("Kalkulator Waris", "Inheritance Calculator")}
            </Link>
            <Link
              href="/training"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <GraduationCap className="h-4 w-4" />
              {t("Pelatihan", "Training")}
            </Link>
            <Link
              href="/mitra"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Handshake className="h-4 w-4" />
              {t("Mitra", "Partners")}
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
            ) : hasLoggedin && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-slate-100"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-teal-600 text-sm font-medium text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate text-sm font-medium text-slate-700">
                    {user.username}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute top-full right-0 z-20 mt-2 w-56 rounded-lg border bg-white py-2 shadow-lg">
                      <div className="border-b px-4 py-2">
                        <p className="truncate font-medium text-slate-900">
                          {user.username}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href={user.role === "admin" ? "/dashboard" : "/profile"}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {user.role === "admin" ? (
                          <>
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard Admin
                          </>
                        ) : (
                          <>
                            <User className="h-4 w-4" />
                            {t("Profil Saya", "My Profile")}
                          </>
                        )}
                      </Link>

                      <Link
                        href="/kelas"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookOpen className="h-4 w-4" />
                        {t("Kelas Saya", "My Classes")}
                      </Link>

                      <Link
                        href="/riwayat-transaksi"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Wallet className="h-4 w-4" />
                        {t("Riwayat Transaksi", "Transaction History")}
                      </Link>

                      {/* Language Toggle */}
                      <div className="mt-2 border-t pt-2">
                        <p className="px-4 py-1 text-xs font-medium tracking-wider text-slate-400 uppercase">
                          {t("Bahasa", "Language")}
                        </p>
                        <button
                          onClick={() => {
                            if (language !== "id") toggleLanguage();
                            setShowUserMenu(false);
                          }}
                          className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${
                            language === "id"
                              ? "font-semibold text-teal-600"
                              : "text-slate-700"
                          }`}
                        >
                          🇮🇩 Bahasa Indonesia
                          {language === "id" && (
                            <span className="ml-auto text-teal-600">✓</span>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (language !== "en") toggleLanguage();
                            setShowUserMenu(false);
                          }}
                          className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${
                            language === "en"
                              ? "font-semibold text-teal-600"
                              : "text-slate-700"
                          }`}
                        >
                          🇬🇧 English
                          {language === "en" && (
                            <span className="ml-auto text-teal-600">✓</span>
                          )}
                        </button>
                      </div>

                      <div className="mt-2 border-t pt-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          {t("Keluar", "Logout")}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-slate-100"
                  title={t("Ganti Bahasa", "Change Language")}
                >
                  <Globe className="h-4 w-4" />
                  {language === "id" ? "ID" : "EN"}
                </button>
                <Link href="/login">
                  <Button variant="outline">{t("Masuk", "Login")}</Button>
                </Link>
                <Link href="/register">
                  <Button>{t("Daftar", "Register")}</Button>
                </Link>
              </>
            )}
          </div>
          <p className="text-lg font-bold sm:hidden">
            {t("Dewan Hukum Siber Indonesia", "Indonesian Cyber Law Council")}
          </p>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 space-y-4 pb-4 md:hidden">
            <Link
              href="/paket"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Package className="h-4 w-4" />
              {t("Paket", "Packages")}
            </Link>
            {/* Mobile Anggota Group */}
            <div className="space-y-1">
              <p className="text-foreground flex items-center gap-2 font-medium">
                <Users className="h-4 w-4" />
                {t("Anggota", "Members")}
              </p>
              <div className="ml-6 space-y-2">
                <Link
                  href="/advokat"
                  className="text-foreground hover:text-primary flex items-center gap-2 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Scale className="h-3.5 w-3.5" />
                  {t("Advokat", "Lawyer")}
                </Link>
                <Link
                  href="/keanggotaan"
                  className="text-foreground hover:text-primary flex items-center gap-2 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Award className="h-3.5 w-3.5" />
                  {t("Anggota", "Members")}
                </Link>
                <Link
                  href="/paralegal"
                  className="text-foreground hover:text-primary flex items-center gap-2 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="h-3.5 w-3.5" />
                  Paralegal
                </Link>
              </div>
            </div>
            <Link
              href="/kalkulator-waris"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Calculator className="h-4 w-4" />
              {t("Kalkulator Waris", "Inheritance Calculator")}
            </Link>
            <Link
              href="/training"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <GraduationCap className="h-4 w-4" />
              {t("Pelatihan", "Training")}
            </Link>
            <Link
              href="/mitra"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Handshake className="h-4 w-4" />
              {t("Mitra", "Partners")}
            </Link>

            {hasLoggedin && user ? (
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-teal-600 font-medium text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {user.username}
                    </p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  href={user.role === "admin" ? "/dashboard" : "/profile"}
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  {user.role === "admin" ? (
                    <>
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard Admin
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4" />
                      {t("Profil Saya", "My Profile")}
                    </>
                  )}
                </Link>

                <Link
                  href="/kelas"
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  {t("Kelas Saya", "My Classes")}
                </Link>

                <Link
                  href="/riwayat-transaksi"
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Wallet className="h-4 w-4" />
                  {t("Riwayat Transaksi", "Transaction History")}
                </Link>

                {/* Mobile Language Toggle */}
                <div className="border-t pt-3">
                  <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Globe className="h-4 w-4" />
                    {t("Bahasa", "Language")}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (language !== "id") toggleLanguage();
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        language === "id"
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🇮🇩 Indonesia
                    </button>
                    <button
                      onClick={() => {
                        if (language !== "en") toggleLanguage();
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        language === "en"
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🇬🇧 English
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("Keluar", "Logout")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 border-t pt-4">
                {/* Language toggle for non-logged-in mobile */}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (language !== "id") toggleLanguage();
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        language === "id"
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🇮🇩 ID
                    </button>
                    <button
                      onClick={() => {
                        if (language !== "en") toggleLanguage();
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        language === "en"
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🇬🇧 EN
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">
                      {t("Masuk", "Login")}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      {t("Daftar", "Register")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
