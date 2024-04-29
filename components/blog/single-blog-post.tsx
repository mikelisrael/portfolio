import { getDate } from "@/lib/utils";
import { IPost } from "@/types";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "./rich-text-component";
import Image from "next/image";
import { blurUpImage, urlForImage } from "@/sanity/lib/image";

const SingleBlogPost = ({ data }: { data: IPost }) => {
  const { title, publishedAt, estimatedReadingTime, body, mainImage } = data;

  return (
    <article className="prose prose-sm prose-h2:mt-5 lg:prose-base prose-ol:pl-3 prose-ul:pl-3 prose-headings:text-foreground max-w-full text-foreground-secondary">
      <p className="space-x-2 text-foreground-secondary">
        <span>{getDate(publishedAt)}</span>
        <span className="text-lg text-primary">•</span>
        <span>📖 {estimatedReadingTime} min read</span>
      </p>

      {/* duration-500 animate-in fade-in slide-in-from-right-48  */}
      <h1
        aria-label="blog header"
        className="text-3xl font-semibold md:text-5xl"
      >
        {title}
      </h1>

      {mainImage && (
        <Image
          src={urlForImage(mainImage)}
          placeholder="blur"
          blurDataURL={blurUpImage(mainImage)}
          alt={mainImage.alt || title}
          className="h-56 object-cover object-center"
          width={1920}
          height={1080}
        />
      )}

      <PortableText value={body} components={RichTextComponent} />
    </article>
  );
};

export default SingleBlogPost;
