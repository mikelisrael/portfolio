import { Comfortaa, Playfair_Display } from "next/font/google";

export const comfortaa_v2 = Comfortaa({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
