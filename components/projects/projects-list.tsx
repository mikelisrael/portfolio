"use client";

import { cn } from "@/lib/utils";
import { blurUpImage, urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GiEmptyHourglass } from "react-icons/gi";
import { AnimatedUpComponent } from "../general/animated-components";

const ProjectsList = ({ projects }: { projects: IProject[] }) => {
  const [selectedProject, setSelectedProject] = useState<null | IProject>(null);
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("project");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    if (selectedProject) {
      window.addEventListener("keydown", handleEscape);
      document.title = selectedProject.name;
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
    <section className="universal_x scroll-m-20 pb-60 pt-20">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {sortedProjects.map((project, idx) => {
          const { name, description, image, link, github, isPrivate } = project;
          return (
            <AnimatedUpComponent threshold={0.2} key={idx}>
              <motion.article
                layoutId={name}
                className="group flex h-full cursor-pointer flex-col gap-1.5"
                onClick={() => setSelectedProject(project)}
              >
                <div className="block aspect-[1.5] h-56 overflow-hidden rounded-lg outline outline-1 outline-gray">
                  {image ? (
                    <Image
                      src={urlForImage(image)}
                      placeholder="blur"
                      blurDataURL={blurUpImage(image)}
                      alt={name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover transition-all duration-200 ease-in-out group-focus-within:scale-125 group-hover:scale-125 group-focus:scale-125"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-background-secondary">
                      <GiEmptyHourglass className="text-3xl text-foreground-secondary" />
                    </div>
                  )}
                </div>

                <h3 className="mt-2 text-sm font-bold md:text-base">{name}.</h3>
                <p className="line-clamp-3 text-sm text-foreground-secondary">
                  {description}
                </p>

                <div
                  className={cn("mt-auto flex items-center py-7", {
                    "justify-between": isPrivate,
                    "justify-end": !isPrivate,
                  })}
                >
                  {isPrivate && (
                    <span className="text-gray-400 bg-background-secondary px-4 py-0.5 text-[10px] tracking-wider">
                      PRIVATE
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    {link && (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="text-base hover:text-primary lg:text-lg" />
                      </Link>
                    )}

                    {github && (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={github}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="text-base hover:text-primary lg:text-lg" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            </AnimatedUpComponent>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject &&
          (() => {
            const { name, subtitle } = selectedProject;
            return (
              <FocusLock>
                <motion.div
                  key={name}
                  className="bg-background-primary fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-background-secondary/70 backdrop-blur-sm"
                  onClick={() => setSelectedProject(null)}
                >
                  <motion.div
                    layoutId={name}
                    className="z-50 aspect-[5/4.5] h-[70%] w-[90%] max-w-lg cursor-default gap-4 rounded-lg bg-background-secondary p-6 shadow-lg outline outline-1 outline-gray"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.h5>{subtitle}</motion.h5>
                    <motion.h2>{name}</motion.h2>
                    <motion.button onClick={() => setSelectedProject(null)} />
                  </motion.div>
                </motion.div>
              </FocusLock>
            );
          })()}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsList;
