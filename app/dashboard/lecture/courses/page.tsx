"use client";

import { LectureShell } from "@/components/dashboard/lecture-shell";
import { CourseForm } from "@/components/dashboard/lecture-forms";

export default function LectureCoursesPage() {``
  return (
    <LectureShell
      title="Manage Courses"
      description="Input dan kelola course lecture terkait hukum siber."
    >
      <div className="space-y-6">
        <CourseForm />
      </div>
    </LectureShell>
  );
}
