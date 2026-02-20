"use client";

import { useGlobalContext } from "@/components/providers/context";
import { AnimatedUpComponent } from "@/components/shared/animated-components";
import BlurImage from "@/components/shared/blur-image";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { IPageInfo } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const ProjectsGalleryDisplay: React.FC<IPageInfo> = ({
  projectInvitation,
  projectInvitationHeading,
  projects,
}) => {
  const { projectTopRef, projectBottomRef } = useGlobalContext();
  const [expandedIndex, setExpandedIndex] = useState(0);

  const projectsToDisplay = projects && projects.length > 0 ? projects : [];

  return (
    <section
      id="projects"
      className="universal_x mx-auto !max-w-5xl space-y-10 py-20 md:py-40"
      ref={projectTopRef}
    >
      <AnimatedUpComponent as="header" className="text-center">
        <h2
          className={cn(
            "text-3xl sm:text-4xl mb-7 font-serif font-light capitalize italic",
          )}
        >
          {projectInvitationHeading}
        </h2>
        <p>{projectInvitation}</p>
      </AnimatedUpComponent>

      <div className="mx-auto flex flex-col gap-1.5 md:flex-row">
        {projectsToDisplay.map((project, index) => {
          const isExpanded = expandedIndex === index;
          const imageUrl = project.image ? urlForImage(project.image) : "";

          return (
            <Link
              href={project.link || "#"}
              target={
                project.link &&
                project.link.startsWith("http") &&
                !project.link.startsWith("https")
                  ? "_self"
                  : "_blank"
              }
              rel={project.link ? "noopener noreferrer" : undefined}
              key={project._id || index}
              className={cn(
                "group relative w-full shrink-0 overflow-hidden rounded-2xl transition-[flex-grow,height] duration-500 ease-in-out",
                // Mobile always expanded, desktop retains original fluid grow logic
                "h-[220px] md:h-[400px] md:w-auto md:basis-[78px]",
                isExpanded ? "md:h-auto md:grow" : "md:grow-0",
              )}
              onMouseEnter={() => setExpandedIndex(index)}
            >
              {imageUrl && (
                <BlurImage
                  src={imageUrl}
                  alt={project.name}
                  fill
                  className="ease-[cubic-bezier(0.4,0,0.2,1)] object-cover transition-transform delay-200 duration-500 group-hover:scale-110"
                />
              )}

              {/* Gradient — always on mobile, hover-controlled on desktop */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
                  "opacity-100",
                  isExpanded ? "md:opacity-100" : "md:opacity-0",
                )}
              />

              {/* Name — always visible on mobile, hover-controlled on desktop */}
              <span
                className={cn(
                  "absolute bottom-4 right-4 text-right text-xl font-bold text-white drop-shadow transition-all delay-100 duration-200",
                  "translate-y-0 opacity-100",
                  isExpanded
                    ? "md:translate-y-0 md:opacity-100"
                    : "md:translate-y-2 md:opacity-0",
                )}
              >
                {project.name}
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        href="/projects"
        className="group mx-auto block w-max font-bold text-primary hover:underline"
      >
        <span>Explore more</span>{" "}
        <FaArrowRight className="inline-block duration-200 group-hover:translate-x-3" />
      </Link>

      <div ref={projectBottomRef} />
    </section>
  );
};

export default ProjectsGalleryDisplay;
