import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MitraPage from "@/components/mitra-page";

export const metadata = {
  title: "Bergabung Sebagai Mitra Paralegal - Dewan Hukum Siber Indonesia",
  description:
    "Bergabunglah menjadi mitra paralegal DHSI dan berkontribusi dalam perlindungan hukum siber di Indonesia. Dapatkan sertifikasi, pelatihan, dan jaringan profesional.",
};

export default function MitraRoute() {
  return (
    <main>
      <Navbar />
      <MitraPage />
      <Footer />
    </main>
  );
}
