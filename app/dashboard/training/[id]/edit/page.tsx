import { notFound } from "next/navigation";
import { TrainingForm } from "@/components/dashboard/training-form";
import { getTrainingById } from "@/lib/training-data";

interface EditTrainingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTrainingPage({
  params,
}: EditTrainingPageProps) {
  const resolvedParams = await params;
  const training = getTrainingById(resolvedParams.id);

  if (!training) {
    notFound();
  }

  return <TrainingForm training={training} mode="edit" />;
}
