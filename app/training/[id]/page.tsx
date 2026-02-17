import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TrainingDetail from "@/components/training-detail";
import { getTrainingById } from "@/lib/training-data";

interface TrainingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TrainingDetailPage({
  params,
}: TrainingDetailPageProps) {
  const resolvedParams = await params;
  const training = getTrainingById(resolvedParams.id);

  if (!training) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <TrainingDetail training={training} />
      <Footer />
    </>
  );
}
