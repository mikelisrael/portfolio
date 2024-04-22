import BlogSection from "@/components/home/blog-section";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import React from "react";

const Home = () => {
  return (
    <main className="pt-0 md:pt-10">
      <Hero />
      <Contact />
      <Projects />
      <BlogSection />
    </main>
  );
};

export default Home;
