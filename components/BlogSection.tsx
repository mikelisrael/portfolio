import { IProps } from "@/pages";
import { FaArrowRight } from "react-icons/fa";
import Balancer from "react-wrap-balancer";

const BlogSection: React.FC<IProps> = ({ blogRef }) => {
  const blogs = [
    {
      title: "Let this be a lesson to you",
      date: "Feb 26",
      category: "Blog",
      link: "https://www.trulyao.dev",
    },
    {
      title: "How do you use time tracking to improve your productivity?",
      date: "Mar 15",
      category: "Blog",
      link: "https://www.trulyao.dev/second-blog",
    },
    {
      title: "Third blog title",
      date: "Mar 30",
      category: "Blog",
      link: "https://www.trulyao.dev/third-blog",
    },
  ];

  return (
    <section ref={blogRef} className="bg-bgSecondary">
      <div className="universal_x grid gap-y-10 py-24 md:grid-cols-[40%,1fr] md:py-32">
        <div>
          <h4
            data-aos="fade-up"
            className="tracking-[0.2em] text-textGray md:text-sm"
          >
            - Blog
          </h4>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            aria-label="about"
            className="mb-1 mt-3 text-xl font-semibold sm:mb-4 sm:text-3xl md:mb-10"
          >
            <Balancer>
              What&rsquo;s New? <br /> My blog and news.
            </Balancer>
          </h2>
        </div>

        <ul>
          {blogs.map((blog, idx) => (
            <li
              key={idx}
              data-aos="fade-left"
              className="group grid cursor-pointer grid-cols-[auto,1fr,auto] items-center gap-5 border-b border-gray py-5 last-of-type:border-0 md:gap-10 lg:gap-20 lg:py-10"
            >
              <span className="space-x-1 text-textGray md:space-x-2 md:text-sm">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.category}</span>
              </span>

              <h4 className="text-sm font-bold sm:text-base md:text-xl">
                {blog.title}
              </h4>

              <FaArrowRight className="inline-block -translate-x-3 text-yellowPrimary duration-200 group-hover:translate-x-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogSection;
