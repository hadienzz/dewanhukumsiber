import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
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
                Dewan Hukum Siber Indonesia
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Forum kolaborasi nasional untuk penguatan regulasi, penegakan
              hukum, dan tata kelola ruang siber Indonesia.
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
            <h3 className="text-foreground mb-4 font-semibold">Program</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Regulasi & Tata Kelola Siber
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Forensik & Pembuktian Digital
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Manajemen Insiden & Krisis
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Etika, Privasi, & Hak Digital
                </a>
              </li>
            </ul>
          </div>

          {/* Dewan */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">Dewan</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Profil & Mandat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Berita & Publikasi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Struktur & Keanggotaan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition"
                >
                  Hubungi Sekretariat
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
                  Kebijakan Keamanan Informasi
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
            © 2025 Dewan Hukum Siber Indonesia.
          </p>
          <p className="text-muted-foreground text-sm">
            Berkolaborasi untuk ruang digital yang aman dan berkeadilan.
          </p>
        </div>
      </div>
    </footer>
  );
}
