import { notFound } from "next/navigation";
import { TrainingPreview } from "@/components/dashboard/training-preview";
import { getTrainingById, getReviewsByTrainingId } from "@/lib/training-data";

interface PreviewTrainingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewTrainingPage({
  params,
}: PreviewTrainingPageProps) {
  const resolvedParams = await params;
  const training = getTrainingById(resolvedParams.id);

  if (!training) {
    notFound();
  }

  const reviews = getReviewsByTrainingId(training.id);

  return <TrainingPreview training={training} reviews={reviews} />;
}
