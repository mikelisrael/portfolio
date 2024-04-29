import Footer from "@/components/general/footer/footer";
import Navbar from "@/components/general/navbar";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { metaKeywords } from "@/lib/metaKeywords";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Michael Israel",
  description: "",
  // icons: {
  //   icon: [
  //     {
  //       url: "/logos/tabs-text-teal.png",
  //       media: "(prefers-color-scheme: light)",
  //     },
  //     {
  //       url: "/logos/tabs-text-white.png",
  //       media: "(prefers-color-scheme: dark)",
  //     },
  //   ],
  //   apple: "/logos/filled_logo_teal.png",
  //   shortcut: "/logos/filled_logo_teal.png",
  // },
  // =========== OPEN GRAPH ===========
  metadataBase: new URL("https://mikelisrael.vercel.app"),
  // openGraph: {
  //   title:
  //     "",
  //   description:
  //     "",
  //   url: "https://mikelisrael.vercel.app",
  //   siteName: "Mikelisrael portfolio",
  //   images: [
  //     {
  //       url: "/OG.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Mikelisrael openGraph image",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // =========== SEO ===========
  keywords: metaKeywords,
  robots: "follow, index",
  authors: [{ name: "Michael Israel", url: "https://mikelisrael-vercel.app" }],
  creator: "Michael Israel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={comfortaa.className + "  duration-200 animate-in fade-in"}
      >
        <Analytics />
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
