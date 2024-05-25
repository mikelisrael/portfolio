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
  "resumeURL": *[_type == "pageInfo"][0].resume.asset->url,
  "projects": *[_type == "project"]{..., tools[]->}
}`;

const Projects = async ({
  searchParams,
}: {
  searchParams: { project: string };
}) => {
  const projectsInfo: ProjectsData = await sanityFetch({
    query: query,
    tags: ["pageInfo", "project"],
  });

  return (
    <main className="pb-32 pt-5 md:pt-10">
      <Header
        intro={projectsInfo.projectsIntro}
        resumeURL={projectsInfo.resumeURL}
      />
      <ProjectsList
        projects={projectsInfo.projects}
        search={searchParams.project}
      />
    </main>
  );
};

export default Projects;
