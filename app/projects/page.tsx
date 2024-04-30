import Header from "@/components/projects/header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects • Michael Israel",
  description:
    "I am a software engineer who loves to build and create. Here are some of the projects I have worked on over the years.",
};

const Projects = () => {
  return (
    <main className="pb-32 pt-10">
      <Header />
    </main>
  );
};

export default Projects;
