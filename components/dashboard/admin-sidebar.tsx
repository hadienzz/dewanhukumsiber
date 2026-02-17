"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BookOpen,
  Calendar,
  Video,
  FileQuestion,
  HelpCircle,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminMenuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Membership",
    href: "/admin/membership",
    icon: CreditCard,
  },
  {
    title: "Trainings",
    href: "/admin/trainings",
    icon: BookOpen,
  },
  {
    title: "Sessions",
    href: "/admin/sessions",
    icon: Calendar,
  },
  {
    title: "Zoom Manager",
    href: "/admin/zoom",
    icon: Video,
  },
  {
    title: "Exams",
    href: "/admin/exams",
    icon: FileQuestion,
  },
  {
    title: "Questions",
    href: "/admin/questions",
    icon: HelpCircle,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background pt-16">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase text-muted-foreground">
            Admin Panel
          </span>
        </div>
        <nav className="flex-1 space-y-1">
          {adminMenuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
