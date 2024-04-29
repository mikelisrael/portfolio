import React from "react";
import { blogs } from "./blogs";
import moment from "moment";
import { getReadingDuration } from "@/lib/utils";
import { AnimatedLeftComponent } from "../general/animated-components";
import Link from "next/link";

const BlogList = () => {
  return (
    <ul className="space-y-10 py-16 md:space-y-14">
      {blogs
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((blog, index) => {
          return (
            <li key={index}>
              <AnimatedLeftComponent className="mb-2 flex items-center gap-x-1 md:gap-x-2 ">
                {blog.category.map((category, index) => (
                  <React.Fragment key={index}>
                    <span className="shrink-0 text-right text-xs uppercase text-foreground-secondary">
                      {category}
                    </span>

                    {index < blog.category.length - 1 && (
                      <span className="text-foreground-secondary">•</span>
                    )}
                  </React.Fragment>
                ))}
              </AnimatedLeftComponent>

              <AnimatedLeftComponent>
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="text-lg font-semibold md:text-2xl">
                    {blog.title}
                  </h3>
                </Link>
              </AnimatedLeftComponent>

              <AnimatedLeftComponent>
                <p className="mt-1 line-clamp-2 text-foreground-secondary">
                  {blog.content}
                </p>
              </AnimatedLeftComponent>

              <AnimatedLeftComponent className="mt-4 flex items-center gap-x-1 text-xs text-foreground-secondary md:gap-x-2 md:text-sm">
                <span>{moment(blog.date).format("DD MMMM, YYYY")}</span>
                <span className="text-lg">•</span>
                <span>📖 {getReadingDuration(blog.content)}</span>
              </AnimatedLeftComponent>
            </li>
          );
        })}
    </ul>
  );
};

export default BlogList;
