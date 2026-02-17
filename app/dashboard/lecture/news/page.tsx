"use client";

import { LectureShell } from "@/components/dashboard/lecture-shell";
import { NewsForm } from "@/components/dashboard/lecture-forms";

export default function LectureNewsPage() {
  return (
    <LectureShell
      title="Manage News"
      description="Input dan kelola berita dan publikasi terkait Dewan Hukum Siber."
    >
      <div className="space-y-6">
        <NewsForm />
      </div>
    </LectureShell>
  );
}
