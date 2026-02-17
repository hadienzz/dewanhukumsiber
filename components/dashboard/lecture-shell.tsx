"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/lecture", label: "Overview" },
  { href: "/dashboard/lecture/courses", label: "Courses" },
  { href: "/dashboard/lecture/news", label: "News" },
];

export function LectureShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em]">
            Lecture Panel
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          {description ? (
            <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
          ) : null}
        </header>

        <nav className="flex flex-wrap gap-2 border-b border-border pb-2 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1 transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/70"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <section>{children}</section>
      </div>
    </main>
  );
}
