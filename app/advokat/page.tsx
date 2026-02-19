import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AdvokatListPage from "@/components/advokat-list-page";

export const metadata = {
  title: "Advokat DHSI - Dewan Hukum Siber Indonesia",
  description:
    "Daftar advokat resmi yang tergabung dalam Dewan Hukum Siber Indonesia, siap memberikan pendampingan hukum profesional.",
};

export default function AdvokatPublicPage() {
  return (
    <main>
      <Navbar />
      <AdvokatListPage />
      <Footer />
    </main>
  );
}
