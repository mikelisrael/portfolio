"use client";

import { IProject } from "@/types";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ProjectCard from "./project-card";

const ExpandedProject = dynamic(() => import("./project-expanded"));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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
      url.searchParams.set("project", selectedProject.slug.current);
      window.history.pushState({}, "", url.toString());
    } else {
      document.body.style.overflow = "auto";

      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      window.history.replaceState({}, "", url.toString());
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
    <section className="universal_x scroll-m-20 pt-16 md:pt-24">
      {/* Section count label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-10 flex items-center justify-between"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground-secondary/40">
          {sortedProjects.length} Projects
        </p>
        <div className="h-px flex-1 mx-6 bg-gradient-to-r from-amber-500/20 to-transparent" />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sortedProjects.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </motion.div>

      {/* Expanded overlay */}
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