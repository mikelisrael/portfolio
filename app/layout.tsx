import Providers from "@/components/providers";
import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/sonner";
import { metaKeywords } from "@/lib/metaKeywords";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const comfortaa_v2 = Comfortaa({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s • Michael Israel",
    default: "Michael Israel",
  },
  description: "The Frontend developer for startups and established projects",
  icons: {
    icon: ["/favicons/favicon.ico"],
    apple: ["/favicons/apple-touch-icon.png"],
    shortcut: ["/favicons/apple-touch-icon.png"],
  },
  manifest: "/favicons/site.webmanifest",
  // =========== OPEN GRAPH ===========
  metadataBase: new URL("https://mikelisrael.vercel.app"),
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Michael Israel",
    description: "The Frontend developer for startups and established projects",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Mikelisrael portfolio",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "Mikelisrael openGraph image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // =========== SEO ===========
  keywords: metaKeywords,
  robots: { index: true, follow: true },
  authors: [
    { name: "Michael Israel", url: `${process.env.NEXT_PUBLIC_BASE_URL}` },
  ],
  creator: "Michael Israel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" 
        suppressHydrationWarning
    >
      <body
        className={
          comfortaa_v2.variable +
          " font-sans antialiased duration-200 animate-in fade-in"
        }
        suppressHydrationWarning
      >
        <Analytics />
        <Providers>
          <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto]">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
