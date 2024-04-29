import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog • Michael Israel",
  //   description: "",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="universal_x !max-w-3xl pt-0 md:pt-10">{children}</div>;
}
