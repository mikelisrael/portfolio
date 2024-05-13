"use client";

import { IProject } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ExpandedProject from "./project-expanded";
import ProjectCard from "./project-card";

const ProjectsList = ({
  projects,
  search,
}: {
  projects: IProject[];
  search: string;
}) => {
  const [selectedProject, setSelectedProject] = useState<null | IProject>(null);
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    if (selectedProject) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      router.replace(
        `${window.location.pathname}?project=${selectedProject.slug.current}`,
        { scroll: false },
      );
    } else {
      document.body.style.overflow = "auto";
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (search) {
      const project = projects.find((p) => p.slug.current === search);
      if (project) setSelectedProject(project);
    }
  }, []);

  return (
    <section className="universal_x scroll-m-20 pt-10 md:pt-20">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {sortedProjects.map((project, idx) => {
          return (
            <ProjectCard
              key={idx}
              project={project}
              setSelectedProject={setSelectedProject}
            />
          );
        })}
      </div>

      {selectedProject && (
        <ExpandedProject
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </section>
  );
};

export default ProjectsList;
