import { getDate } from "@/lib/utils";
import { IPost } from "@/types";

const SingleBlogPost = ({ data }: { data: IPost }) => {
  const { title, publishedAt, estimatedReadingTime } = data;

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

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
        repellendus quae corrupti iure doloribus illo harum vitae dignissimos
        temporibus! Perspiciatis, dolore sed? Eius quis aperiam consequuntur
        laboriosam sequi aspernatur exercitationem!
      </p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
        repellendus quae corrupti iure doloribus illo harum vitae dignissimos
        temporibus! Perspiciatis, dolore sed? Eius quis aperiam consequuntur
        laboriosam sequi aspernatur exercitationem!
      </p>

      <h2>Go Away</h2>
      <ul>
        <li>Go away</li>
        <li>Go away</li>
        <li>Go away</li>
        <li>Go away</li>
      </ul>
    </article>
  );
};

export default SingleBlogPost;
