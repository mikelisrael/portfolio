import { getDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { IPost } from "@/types";
import { PortableText } from "@portabletext/react";
import BlurImage from "../shared/blur-image";
import HeaderRef from "../shared/section-refs/header-ref";
import { Badge } from "../ui/badge";
import { RichTextComponent } from "./rich-text-component";
import SocialShare from "./social-share";

const SingleBlogPost = ({ data }: { data: IPost }) => {
  const {
    title,
    publishedAt,
    estimatedReadingTime,
    body,
    mainImage,
    author,
    categories,
  } = data;

  return (
    <article className="prose prose-sm max-w-full text-foreground-secondary lg:prose-base prose-headings:text-foreground prose-h1:mb-5 prose-h2:mt-5 prose-blockquote:border-foreground-secondary prose-blockquote:text-foreground-secondary prose-strong:font-black prose-strong:text-foreground prose-ol:pl-3 prose-ul:pl-3 [&_code:not([class])]:bg-[#5E627D] [&_code:not([class])]:text-white">
      <p className="flex items-center gap-x-2 text-foreground-secondary">
        <span>{getDate(publishedAt)}</span>
        <span className="text-lg text-primary">•</span>
        <span>📖 {estimatedReadingTime} min read</span>
      </p>

      <HeaderRef>
        <h1
          aria-label="blog header"
          className="text-3xl font-semibold md:text-5xl"
        >
          {title}
        </h1>

        <SocialShare />

        {author && (
          <div className="flex items-center gap-3">
            <BlurImage
              width={100}
              height={100}
              src={urlForImage(author.image)}
              alt={author.name}
              className="!my-0 size-10 rounded-full bg-background-secondary object-cover !py-0"
              priority
              unoptimized
            />

            <span>{author.name}</span>
          </div>
        )}
      </HeaderRef>

      {mainImage && (
        <div>
          <BlurImage
            src={urlForImage(mainImage)}
            alt={mainImage.alt || title}
            className="h-56 object-cover object-center"
            width={1920}
            height={1080}
            unoptimized
          />
          {mainImage.caption && (
            <h6 className="-translate-y-2 text-center text-xs !text-foreground-secondary/60">
              {mainImage.caption}
            </h6>
          )}
        </div>
      )}

      <PortableText value={body} components={RichTextComponent} />

      {categories && (
        <div className="mt-12 flex flex-wrap gap-2 md:mt-16">
          {categories.map((category, idx) => (
            <Badge key={idx} className="bg-background-secondary">
              {category.title}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
};

export default SingleBlogPost;
