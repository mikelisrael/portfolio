import Header from "@/components/projects/header";
import ProjectsList from "@/components/projects/projects-list";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ProjectsData } from "@/types";
import { Metadata } from "next";
import { groq } from "next-sanity";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "I am a software engineer who loves to build and create. Here are some of the projects I have worked on over the years.",
};

const query = groq`{
  "projectsIntro": *[_type == "pageInfo"][0].projectsIntro,
  "projects": *[_type == "project"]
}`;

const Projects = async () => {
  const projectsInfo: ProjectsData = await sanityFetch({
    query: query,
    tags: ["pageInfo", "project"],
  });

  return (
    <main className="pb-32 pt-10">
      <Header intro={projectsInfo.projectsIntro} />
      <ProjectsList projects={projectsInfo.projects} />
    </main>
  );
};

export default Projects;
