import { getDate } from "@/lib/utils";
import { IPost } from "@/types";
import Link from "next/link";
import React from "react";
import { AnimatedLeftComponent } from "../shared/animated-components";

const BlogList = ({ posts }: { posts: IPost[] }) => {
  return (
    <ul className="space-y-10 py-16 md:space-y-14">
      {posts
        .sort(
          (a, b) =>
            new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime(),
        )
        .map((blog, index) => {
          const {
            categories,
            title,
            slug,
            publishedAt,
            plainText,
            estimatedReadingTime,
          } = blog;

          return (
            <li key={index}>
              {categories && (
                <AnimatedLeftComponent className="mb-2 flex items-center gap-x-1 md:gap-x-2 ">
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <span className="shrink-0 text-right text-xs uppercase text-foreground-secondary">
                        {category.title}
                      </span>

                      {index < blog.categories.length - 1 && (
                        <span className="text-foreground-secondary">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </AnimatedLeftComponent>
              )}

              <AnimatedLeftComponent>
                <Link
                  href={`/blog/${slug.current}`}
                  className="hover:underline"
                >
                  <h3 className="text-lg font-semibold md:text-2xl">{title}</h3>
                </Link>
              </AnimatedLeftComponent>

              <AnimatedLeftComponent
                as="p"
                className="mt-1 line-clamp-2 text-foreground-secondary"
              >
                {plainText}
              </AnimatedLeftComponent>

              <AnimatedLeftComponent className="mt-4 flex items-center gap-x-1 text-xs text-foreground-secondary md:gap-x-2 md:text-sm">
                <span>{getDate(publishedAt)}</span>
                <span className="text-lg text-primary">•</span>
                <span>📖 {estimatedReadingTime} min read</span>
              </AnimatedLeftComponent>
            </li>
          );
        })}
    </ul>
  );
};

export default BlogList;
