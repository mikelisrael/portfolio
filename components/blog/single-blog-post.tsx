import { getDate } from "@/lib/utils";
import { IPost } from "@/types";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "./rich-text-component";

const SingleBlogPost = ({ data }: { data: IPost }) => {
  const { title, publishedAt, estimatedReadingTime, body } = data;

  return (
    <article className="prose prose-sm lg:prose-base prose-ol:pl-3 prose-ul:pl-3 prose-headings:text-foreground max-w-full text-foreground-secondary">
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

      <PortableText value={body} components={RichTextComponent} />
    </article>
  );
};

export default SingleBlogPost;
