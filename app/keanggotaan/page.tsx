import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import KeanggotaanListPage from "@/components/keanggotaan-list-page";

export const metadata = {
  title: "Keanggotaan DHSI - Dewan Hukum Siber Indonesia",
  description:
    "Daftar anggota resmi Dewan Hukum Siber Indonesia yang berkontribusi dalam pengembangan hukum siber di Indonesia.",
};

export default function KeanggotaanPublicPage() {
  return (
    <main>
      <Navbar />
      <KeanggotaanListPage />
      <Footer />
    </main>
  );
}
