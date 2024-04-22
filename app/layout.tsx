import Footer from "@/components/general/footer/footer";
import Navbar from "@/components/general/navbar";
import { AppProvider } from "@/components/providers/context";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  //     "Tabs | Efficient Inventory Management and HR Solutions. Boost Your Business with Tabs",
  //   description:
  //     "Tabs provides seamless inventory management and HR solutions, streamlining your business operations for enhanced productivity and success.",
  //   url: "https://usetabs.app/",
  //   siteName: "Tabs",
  //   images: [
  //     {
  //       url: "/OG.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Tabs openGraph image",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // =========== SEO ===========
  // keywords: [
  //   "Tabs",
  //   "Inventory Management",
  //   "HR Solutions",
  //   "Business Operations",
  //   "Productivity",
  //   "Success",
  // ],
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
      <body className={comfortaa.className}>
        <AppProvider>
          <ScrollArea className="h-dvh">
            <Navbar />
            {children}
            <Footer />
          </ScrollArea>
        </AppProvider>
      </body>
    </html>
  );
}
