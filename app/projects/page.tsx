import Header from "@/components/projects/header";
import ProjectsList from "@/components/projects/projects-list";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { IProject, ProjectsData } from "@/types";
import { Metadata } from "next";
import { groq } from "next-sanity";

const query = groq`{
  "projectsIntro": *[_type == "pageInfo"][0].projectsIntro,
  "resumeURL": *[_type == "pageInfo"][0].resume.asset->url,
  "projects": *[_type == "project"]{..., tools[]->}
}`;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { project: string };
}): Promise<Metadata> {
  const defaultMetadata = {
    title: "Projects",
    description:
      "I am a software engineer who loves to build and create. Here are some of the projects I have worked on over the years.",
  };

  if (!searchParams.project) return defaultMetadata;

  try {
    const projectsInfo: ProjectsData = await sanityFetch({
      query,
      tags: ["pageInfo", "project"],
    });

    const selectedProject = projectsInfo.projects.find(
      (p: IProject) => p.slug.current === searchParams.project,
    );

    if (!selectedProject) return defaultMetadata;

    return {
      title: `${selectedProject.name} • Michael Israel`,
      description: selectedProject.description,
      openGraph: {
        title: `${selectedProject.name} • Michael Israel`,
        description: selectedProject.description,
        images: selectedProject.image
          ? [
              {
                url: urlForImage(selectedProject.image),
                width: 1920,
                height: 1080,
                alt: selectedProject.name,
              },
            ]
          : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${selectedProject.name} • Michael Israel`,
        description: selectedProject.description,
        images: selectedProject.image
          ? [urlForImage(selectedProject.image)]
          : [],
      },
    };
  } catch {
    return defaultMetadata;
  }
}

const Projects = async ({
  searchParams,
}: {
  searchParams: { project: string };
}) => {
  const projectsInfo: ProjectsData = await sanityFetch({
    query,
    tags: ["pageInfo", "project"],
  });

  return (
    <main className="relative min-h-screen pb-40 pt-10 md:pt-16">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/[0.03] blur-[100px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10">
        <Header
          intro={projectsInfo.projectsIntro}
          resumeURL={projectsInfo.resumeURL}
        />
        <ProjectsList
          projects={projectsInfo.projects}
          search={searchParams.project}
        />
      </div>
    </main>
  );
};

export default Projects;
