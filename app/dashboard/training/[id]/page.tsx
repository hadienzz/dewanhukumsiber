import { redirect } from "next/navigation";

interface TrainingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TrainingDetailPage({
  params,
}: TrainingDetailPageProps) {
  const resolvedParams = await params;
  redirect(`/dashboard/training/${resolvedParams.id}/preview`);
}
