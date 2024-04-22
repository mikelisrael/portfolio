import BlogSection from "@/components/home/blog-section";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import { client } from "@/sanity/lib/client";
import { IPageInfo } from "@/types";
import { groq } from "next-sanity";

const query = groq`*[_type == "pageInfo"][0]{
  ...,
  socials[]->
}`;

const Home = async () => {
  const pageInfo: IPageInfo = await client.fetch(query);

  return (
    <main className="pt-0 md:pt-10">
      <Hero {...pageInfo} />
      <Contact {...pageInfo} />
      <Projects />
      <BlogSection />
    </main>
  );
};

export default Home;
