"use client";

import { IProject } from "@/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ProjectCard from "./project-card";
const ExpandedProject = dynamic(() => import("./project-expanded"));

const ProjectsList = ({
  projects,
  search,
}: {
  projects: IProject[];
  search: string;
}) => {
  const [selectedProject, setSelectedProject] = useState<null | IProject>(null);
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    if (selectedProject) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      
  
      const url = new URL(window.location.href);
      url.searchParams.set('project', selectedProject.slug.current);
      window.history.pushState({}, '', url.toString());
      
    } else {
      document.body.style.overflow = "auto";
    
      const url = new URL(window.location.href);
      url.searchParams.delete('project');
      window.history.replaceState({}, '', url.toString());
    }

    return () => {
      if (selectedProject) {
        window.removeEventListener("keydown", handleEscape);
      }
    };
  }, [selectedProject]);

  useEffect(() => {
    if (search) {
      const project = projects.find((p) => p.slug.current === search);
      if (project) setSelectedProject(project);
    }
  }, [projects, search]);

  return (
    <section className="universal_x scroll-m-20 pt-14 md:pt-20">
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