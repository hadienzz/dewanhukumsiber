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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useGetUser from "@/hooks/auth/use-get-user";
import logout from "@/services/auth/logout";
import useLogout from "@/hooks/auth/use-logout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: user, isLoading, hasLoggedin } = useGetUser();
  const { logout, isLoading: isLoggingOut } = useLogout();

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
              Dewan Hukum Siber Indonesia
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/paket"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Package className="h-4 w-4" />
              Paket
            </Link>
            <Link
              href="/paralegal"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Shield className="h-4 w-4" />
              Paralegal
            </Link>
            <Link
              href="/kalkulator-waris"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Calculator className="h-4 w-4" />
              Kalkulator Waris
            </Link>
            <Link
              href="/training"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <GraduationCap className="h-4 w-4" />
              Pelatihan
            </Link>
            <Link
              href="/mitra"
              className="text-foreground hover:text-primary flex items-center gap-1 transition"
            >
              <Handshake className="h-4 w-4" />
              Mitra
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
                            Profil Saya
                          </>
                        )}
                      </Link>

                      <Link
                        href="/kelas"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookOpen className="h-4 w-4" />
                        Kelas Saya
                      </Link>

                      <Link
                        href="/riwayat-transaksi"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Wallet className="h-4 w-4" />
                        Riwayat Transaksi
                      </Link>

                      <div className="mt-2 border-t pt-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button>Daftar</Button>
                </Link>
              </>
            )}
          </div>
          <p className="text-lg font-bold sm:hidden">
            Dewan Hukum Siber Indonesia
          </p>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              Paket
            </Link>
            <Link
              href="/paralegal"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="h-4 w-4" />
              Paralegal
            </Link>
            <Link
              href="/kalkulator-waris"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Calculator className="h-4 w-4" />
              Kalkulator Waris
            </Link>
            <Link
              href="/training"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <GraduationCap className="h-4 w-4" />
              Pelatihan
            </Link>
            <Link
              href="/mitra"
              className="text-foreground hover:text-primary flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Handshake className="h-4 w-4" />
              Mitra
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
                      Profil Saya
                    </>
                  )}
                </Link>

                <Link
                  href="/kelas"
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  Kelas Saya
                </Link>

                <Link
                  href="/riwayat-transaksi"
                  className="flex items-center gap-2 px-2 py-2 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Wallet className="h-4 w-4" />
                  Riwayat Transaksi
                </Link>

                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Daftar</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
