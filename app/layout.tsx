import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ünsiyet Derneği | Evlilik Destek Merkezi",
  description:
    "Evlilik hazırlığında destek arayan bireyleri resmi kurumlar, vakıflar, eğitimler ve danışmanlık kaynaklarıyla buluşturan Ünsiyet Derneği platformu.",
  other: {
    "codex-preview": "unsiyet-dernegi",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
