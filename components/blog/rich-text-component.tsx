import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export const RichTextComponent = {
  types: {
    image: ({ value }: any) => {
      return (
        <div>
          <Image
            className="h-auto w-full"
            src={urlForImage(value)}
            alt={value.alt}
            width={1920}
            height={1080}
          />
        </div>
      );
    },
    code: (props: any) => {
      return (
        <div className="relative grid w-full grid-cols-1">
          <SyntaxHighlighter
            language={props.value.language}
            style={dracula}
            className="grid-cols-1 text-sm md:text-base"
          >
            {props.value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
  block: {
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
      const isInternal = value?.href?.startsWith("/");
      const target = isInternal ? undefined : "_blank";

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
