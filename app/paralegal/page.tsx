import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ParalegalListPage from "@/components/paralegal-list-page";

export const metadata = {
  title: "Paralegal DHSI - Dewan Hukum Siber Indonesia",
  description:
    "Daftar paralegal yang terdaftar di Dewan Hukum Siber Indonesia",
};

export default function ParalegalPage() {
  return (
    <main>
      <Navbar />
      <ParalegalListPage />
      <Footer />
    </main>
  );
}
