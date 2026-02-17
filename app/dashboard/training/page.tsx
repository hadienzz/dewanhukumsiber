import { TrainingList } from "@/components/dashboard/training-list";
import { getAllTrainings } from "@/lib/training-data";

export default function TrainingPage() {
  const trainings = getAllTrainings();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <TrainingList trainings={trainings} />
      </div>
    </div>
  );
}
