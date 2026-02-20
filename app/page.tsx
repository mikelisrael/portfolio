import BlogSection from "@/components/home/blog-section";
import Contact from "@/components/home/contact";
import FormSection from "@/components/home/contact-form/form-section";
import Hero from "@/components/home/hero";
import ProjectsGalleryDisplay from "@/components/home/projects-gallery-display";
import Services from "@/components/home/services";
import Technologies from "@/components/home/technologies";
import Testimonials from "@/components/home/testimonials";
import ThankYou from "@/components/home/thank-you";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IPageInfo } from "@/types";
import { groq } from "next-sanity";

const query = groq`*[_type == "pageInfo"][0]{
  ...,
  socials[]->,
  testimonials[]->,
  projects[]->,
  "latestPosts":
    *[_type == "post"]|order(publishedAt desc)[0..2]{ 
      "slug": slug.current,
      title,
      publishedAt,
    },
}`;

const Home = async () => {
  const pageInfo: IPageInfo = await sanityFetch({
    query,
    tags: ["pageInfo", "testimonial", "project"],
  });

  return (
    <main className="pt-0 md:pt-10">
      <Hero {...pageInfo} />
      <Contact {...pageInfo} />

      <Services />
      {/* <MacbookScroll /> */}
      <Technologies />
      <ProjectsGalleryDisplay {...pageInfo} />
      {/* <Projects {...pageInfo} /> */}
      <BlogSection posts={pageInfo.latestPosts} />
      <Testimonials {...pageInfo} />
      <FormSection email={pageInfo.email} cta={pageInfo.cta} />
      <ThankYou />
    </main>
  );
};

export default Home;
