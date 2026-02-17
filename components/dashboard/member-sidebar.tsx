"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  BookOpen,
  Video,
  FileQuestion,
  MessageCircle,
  Award,
  User,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const memberMenuItems = [
  {
    title: "Beranda",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Membership",
    href: "/dashboard/membership",
    icon: CreditCard,
  },
  {
    title: "Pelatihan Saya",
    href: "/dashboard/trainings",
    icon: BookOpen,
  },
  {
    title: "Live Class",
    href: "/dashboard/live-class",
    icon: Video,
  },
  {
    title: "Ujian",
    href: "/dashboard/exams",
    icon: FileQuestion,
  },
  {
    title: "Diskusi",
    href: "/dashboard/discussions",
    icon: MessageCircle,
  },
  {
    title: "Sertifikat",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    title: "Profil",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function MemberSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background pt-16">
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="flex-1 space-y-1">
          {memberMenuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
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
