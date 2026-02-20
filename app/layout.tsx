import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DHSI - Dewan Hukum Siber Indonesia",
  description:
    "Platform pelatihan dan edukasi hukum digital, keamanan siber, dan perlindungan data",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

import TanstackProvider from "@/lib/tanstack-provider";
import { LanguageProvider } from "@/lib/language-context";
import { Toaster } from "sonner";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster richColors position="bottom-right" />
        <LanguageProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </LanguageProvider>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
