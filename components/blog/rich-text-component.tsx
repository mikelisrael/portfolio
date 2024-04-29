import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

// generate random ID's with crypto
const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export const RichTextComponent = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full">
          <Image
            className="h-auto w-full"
            src={urlForImage(value)}
            alt={value.alt}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0" />
        </div>
      );
    },
  },
  block: {
    // customizing - might add ID's to the headers
    h1: ({ children }: any) => (
      <h1 className="scroll-m-28" id={randomId()}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="scroll-m-28" id={randomId()}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="scroll-m-28" id={randomId()}>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="scroll-m-28" id={randomId()}>
        {children}
      </h4>
    ),
  },
  marks: {
    link: ({ value, children }: any) => {
      // If the link is internal, we don't want to open it in a new tab
      const target = (value?.href || "").startsWith("/") ? undefined : "_blank";

      return (
        <Link
          className="hover:text-primary"
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
        >
          {children}
        </Link>
      );
    },
  },
};