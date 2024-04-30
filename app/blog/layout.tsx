import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Here I express my thoughts and ideas on various topics. I hope you find them interesting and engaging.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="universal_x relative !max-w-3xl pb-32 pt-10">
      {children}
    </div>
  );
}
