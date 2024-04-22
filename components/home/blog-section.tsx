"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  AnimatedLeftComponent,
  AnimatedUpComponent,
} from "../general/animated-components";
import { useGlobalContext } from "../providers/context";

const BlogSection = () => {
  const { blogRef } = useGlobalContext();

  const blogs = [
    {
      title: "Let this be a lesson to you",
      date: "Feb 26",
      link: "https://www.trulyao.dev",
    },
    {
      title: "How do you use time tracking to improve your productivity?",
      date: "Mar 15",
      link: "https://www.trulyao.dev/second-blog",
    },
    {
      title: "Third blog title",
      date: "Mar 30",
      link: "https://www.trulyao.dev/third-blog",
    },
  ];

  return (
    <section
      id="blog"
      ref={blogRef}
      className="bg-background-secondary scroll-m-20"
    >
      <div className="universal_x grid gap-y-10 py-24 md:grid-cols-[40%,1fr] md:py-32">
        <div>
          <AnimatedUpComponent>
            <h6 className="text-foreground-secondary text-xs tracking-[0.2em] md:text-sm">
              - Blog
            </h6>
          </AnimatedUpComponent>

          <AnimatedUpComponent delay={0.1}>
            <h2
              aria-label="about"
              className="mb-1 mt-3 text-balance text-xl font-semibold sm:mb-4 sm:text-3xl md:mb-10"
            >
              What&rsquo;s New? <br /> My blog and news.
            </h2>
          </AnimatedUpComponent>
        </div>

        <div className="overflow-x-hidden">
          {blogs.map((blog, idx) => (
            <AnimatedLeftComponent
              delay={0.2}
              key={idx}
              className="border-b border-gray last-of-type:border-0"
            >
              <Link
                href="/"
                className="group grid grid-cols-[auto,1fr,auto] items-center gap-5 py-5 md:gap-10 lg:gap-20 lg:py-10"
              >
                <span className="text-foreground-secondary space-x-1 text-xs md:space-x-2 md:text-sm">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>Blog</span>
                </span>

                <h4 className="text-sm font-bold sm:text-base md:text-xl">
                  {blog.title}
                </h4>

                <FaArrowRight className="inline-block -translate-x-3 text-primary duration-200 group-hover:translate-x-0" />
              </Link>
            </AnimatedLeftComponent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
