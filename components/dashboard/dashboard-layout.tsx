"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Crown,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  Calendar,
  Presentation,
  Loader2,
  CreditCard,
  Video,
  FileQuestion,
  MessageCircle,
  Award,
  User,
  BarChart3,
} from "lucide-react";
import useGetUser from "@/hooks/auth/use-get-user";
import AccessDenied from "@/components/access-denied";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Menu untuk Member
const memberNavigation = [
  { name: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { name: "Membership", href: "/dashboard/membership", icon: CreditCard },
  { name: "Pelatihan Saya", href: "/dashboard/trainings", icon: BookOpen },
  { name: "Live Class", href: "/dashboard/live-class", icon: Video },
  { name: "Ujian", href: "/dashboard/exams", icon: FileQuestion },
  { name: "Diskusi", href: "/dashboard/discussions", icon: MessageCircle },
  { name: "Sertifikat", href: "/dashboard/certificates", icon: Award },
  { name: "Profil", href: "/dashboard/profile", icon: User },
];

// Menu untuk Admin
const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Membership", href: "/dashboard/membership-admin", icon: CreditCard },
  {
    name: "Pelatihan & Workshop",
    href: "/dashboard/training",
    icon: Presentation,
  },
  { name: "Live Sessions", href: "/dashboard/sessions", icon: Calendar },
  { name: "Zoom Manager", href: "/dashboard/zoom", icon: Video },
  { name: "Ujian", href: "/dashboard/exams-admin", icon: FileQuestion },
  { name: "Bank Soal", href: "/dashboard/questions", icon: Crown },
  { name: "Laporan", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

// Gunakan admin navigation untuk dashboard (bisa disesuaikan berdasarkan role)
const navigation = adminNavigation;

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: user, isLoading } = useGetUser();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  // Show access denied if not admin
  if (!user || user.role !== "admin") {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <Image src={"/logo.webp"} alt="Logo" width={48} height={48} />
              </div>
              <span className="text-sm font-bold text-slate-900">
                Dewan Hukum Siber Indonesia
              </span>
            </Link>
          )}

          {collapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg">
              <Image src={"/logo.webp"} alt="Logo" width={40} height={19} />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden border-t border-slate-200 p-3 lg:block">
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full", collapsed ? "px-2" : "")}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Collapse
              </>
            )}
          </Button>
        </div>

        {/* User Section */}
        <div className="border-t border-slate-200 p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg p-2",
              collapsed && "justify-center",
            )}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-700">
              {user.username?.slice(0, 2).toUpperCase() || "AD"}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {user.username}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "lg:pl-16" : "lg:pl-64",
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-slate-500 transition-colors hover:text-slate-900"
              >
                <Home className="h-4 w-4" />
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-900">Dashboard</span>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
