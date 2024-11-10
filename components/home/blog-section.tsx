import moment from "moment";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  AnimatedLeftComponent,
  AnimatedUpComponent,
} from "../shared/animated-components";
import BlogRef from "../shared/section-refs/blog-ref";

interface Props {
  posts: {
    title: string;
    publishedAt: string;
    slug: string;
  }[];
}

const returnDate = (date: string) => moment(date).format("MMM DD");

const BlogSection = ({ posts }: Props) => {
  return (
    <BlogRef id="blog" className="scroll-m-20 bg-background-secondary">
      <div className="universal_x grid gap-x-10 gap-y-10 py-24 md:grid-cols-[300px,1fr] md:py-32 lg:grid-cols-[350px,1fr] lg:gap-x-28">
        <div>
          <AnimatedUpComponent
            as="h6"
            className="text-xs tracking-[0.2em] text-foreground-secondary md:text-sm"
          >
            - Blog
          </AnimatedUpComponent>

          <AnimatedUpComponent
            as="h2"
            delay={0.1}
            className="mb-1 mt-3 text-balance text-xl font-semibold sm:mb-4 sm:text-3xl md:mb-10"
          >
            What&rsquo;s New? <br /> My blog and news.
          </AnimatedUpComponent>
        </div>

        <div className="overflow-x-hidden">
          {posts.length > 0 &&
            posts.map((blog, idx) => (
              <AnimatedLeftComponent
                delay={0.2}
                key={idx}
                className="border-b border-gray last-of-type:border-0"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group grid grid-cols-[auto,1fr,auto] items-center gap-5 py-5 md:gap-5 lg:gap-10 lg:py-10 xl:gap-20"
                >
                  <span className="space-x-0.5 text-xs text-foreground-secondary md:space-x-2 md:text-sm lg:space-x-1">
                    <span>{returnDate(blog.publishedAt)}</span>
                    <span>•</span>
                    <span>Blog</span>
                  </span>

                  <h4 className="text-sm line-clamp-2 font-bold sm:text-base md:text-xl">
                    {blog.title}
                  </h4>

                  <FaArrowRight className="inline-block -translate-x-3 text-primary duration-200 group-hover:translate-x-0" />
                </Link>
              </AnimatedLeftComponent>
            ))}
        </div>
      </div>
    </BlogRef>
  );
};

export default BlogSection;
