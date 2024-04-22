"use client";

import { IProject } from "@/types";
import ProjectCard from "./project-card";
import { useGlobalContext } from "../providers/context";
import { AnimatedLeftComponent } from "../general/animated-components";

const Projects = () => {
  const { projectTopRef, projectBottomRef } = useGlobalContext();
  const projects: IProject[] = [
    {
      name: "Project Z",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/img/project.png",
      github: "",
      isPrivate: true,
    },
    {
      name: "Project X",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/img/project.png",
      github: "",
    },
    {
      name: "Project Y",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/img/project.png",
      github: "",
      isPrivate: true,
      link: "https://www.trulyao.dev",
    },
    {
      name: "Project X",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/img/project.png",
      github: "",
      isPrivate: true,
    },
    {
      name: "Project Y",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/img/project.png",
      github: "",
      isPrivate: true,
      link: "https://www.trulyao.dev",
    },
    {
      name: "Project Z",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/img/project.png",
      github: "",
      isPrivate: true,
    },
  ];

  return (
    <section
      id="projects"
      className="universal_x relative isolate py-20 md:py-40"
    >
      <AnimatedLeftComponent>
        <h6 className="text-foreground-secondary text-xs tracking-[0.2em] md:text-sm">
          - Portfolio
        </h6>
      </AnimatedLeftComponent>

      <AnimatedLeftComponent delay={0.1}>
        <h2
          aria-label="about"
          className="mb-10 mt-3 text-balance text-xl font-semibold sm:text-3xl md:mb-16"
        >
          All creative works, selected projects
        </h2>{" "}
      </AnimatedLeftComponent>

      <div ref={projectTopRef} />

      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <div ref={projectBottomRef} />
    </section>
  );
};

export default Projects;
