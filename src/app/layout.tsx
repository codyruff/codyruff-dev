import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ── Font Definitions ── */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/* ── Metadata (SEO + Open Graph) ── */
export const metadata: Metadata = {
  title: "Cody Ruff — Security Engineer",
  description:
    "Security Engineer, builder, and D1 athlete. Incoming engineer at Raytheon. Stonehill College '26.",
  openGraph: {
    title: "Cody Ruff — Security Engineer",
    description: "Security Engineer, builder, and D1 athlete.",
    url: "https://codyruff.dev",
    siteName: "Cody Ruff",
    images: [
      {
        url: "/headshot.jpg",
        width: 800,
        height: 1000,
        alt: "Cody Ruff",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cody Ruff — Security Engineer",
    images: ["/headshot.jpg"],
  },
};

/* ── Root Layout ── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-navy text-cream font-body antialiased">
        {children}
      </body>
    </html>
  );
}