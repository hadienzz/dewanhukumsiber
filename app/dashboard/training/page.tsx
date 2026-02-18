import { TrainingList } from "@/components/dashboard/training-list";

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <TrainingList />
      </div>
    </div>
  );
}