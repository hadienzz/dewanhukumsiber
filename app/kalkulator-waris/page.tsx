import { InheritanceCalculatorPage } from "@/components/inheritance-calculator-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Ahli Waris - DHSI",
  description:
    "Hitung pembagian harta warisan dengan mudah dan akurat. Mendukung Hukum Islam (Faraid) dan Hukum Perdata Indonesia.",
  keywords: [
    "kalkulator waris",
    "faraid",
    "ahli waris",
    "pembagian warisan",
    "hukum waris islam",
    "kuhperdata",
  ],
};

export default function KalkulatorWarisPage() {
  return <InheritanceCalculatorPage />;
}
