"use client";

import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                <Image
                  src={"/logo.webp"}
                  width={48}
                  height={48}
                  alt="Logo DHSI" 
                />
              </div>
              <span className="text-foreground text-lg font-bold">
                {t("Dewan Hukum Siber Indonesia", "Indonesian Cyber Law Council")}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t(
                "Forum kolaborasi nasional untuk penguatan regulasi, penegakan hukum, dan tata kelola ruang siber Indonesia.",
                "National collaboration forum for strengthening regulations, law enforcement, and governance of Indonesia's cyberspace."
              )}
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Program */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{t("Program", "Programs")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Regulasi & Tata Kelola Siber", "Cyber Regulation & Governance")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Forensik & Pembuktian Digital", "Digital Forensics & Evidence")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Manajemen Insiden & Krisis", "Incident & Crisis Management")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Etika, Privasi, & Hak Digital", "Ethics, Privacy, & Digital Rights")}
                </a>
              </li>
            </ul>
          </div>

          {/* Dewan */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{t("Dewan", "Council")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Profil & Mandat", "Profile & Mandate")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Berita & Publikasi", "News & Publications")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Struktur & Keanggotaan", "Structure & Membership")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Hubungi Sekretariat", "Contact Secretariat")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  {t("Kebijakan Keamanan Informasi", "Information Security Policy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="mt-8 flex flex-col items-center justify-between md:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2025 {t("Dewan Hukum Siber Indonesia", "Indonesian Cyber Law Council")}.
          </p>
          <p className="text-muted-foreground text-sm">
            {t(
              "Berkolaborasi untuk ruang digital yang aman dan berkeadilan.",
              "Collaborating for a safe and just digital space."
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
