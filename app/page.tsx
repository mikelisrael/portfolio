import BlogSection from "@/components/home/blog-section";
import Contact from "@/components/home/contact";
import FormSection from "@/components/home/contact-form/form-section";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects-section";
import Services from "@/components/home/services";
import Technologies from "@/components/home/technologies/technologies";
import Testimonials from "@/components/home/testimonials";
import ThankYou from "@/components/home/thank-you";
import { sanityFetch } from "@/sanity/lib/onDemandFetch";
import { IPageInfo } from "@/types";
import { groq } from "next-sanity";

const query = groq`*[_type == "pageInfo"][0]{
  ...,
  socials[]->,
  testimonials[]->
}`;

const Home = async () => {
  const pageInfo: IPageInfo = await sanityFetch({
    query,
    tags: ["pageInfo", "testimonial"], // will revalidate for page info changes
  });

  return (
    <main className="pt-0 md:pt-10">
      <Hero {...pageInfo} />
      <Contact {...pageInfo} />
      <Services />
      <Technologies />
      <Projects {...pageInfo} />
      <BlogSection />
      <Testimonials {...pageInfo} />
      <FormSection email={pageInfo.email} cta={pageInfo.cta} />
      <ThankYou/>
    </main>
  );
};

export default Home;
