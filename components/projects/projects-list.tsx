"use client";

import { cn } from "@/lib/utils";
import { blurUpImage, urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GiEmptyHourglass } from "react-icons/gi";

const scaleInVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.08 * index },
  }),
};

const ProjectsList = ({ projects }: { projects: IProject[] }) => {
  const [selectedProject, setSelectedProject] = useState<null | IProject>(null);
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <section className="universal_x scroll-m-20 pb-60 pt-20">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {sortedProjects.map((project, idx) => {
          const { name, description, image, link, github, isPrivate } = project;
          return (
            <motion.article
              key={idx}
              layoutId={name}
              variants={scaleInVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={idx}
              className="group flex h-full cursor-pointer flex-col gap-1.5"
              onClick={() => setSelectedProject(project)}
            >
              <div className="block aspect-[1.5] h-56 overflow-hidden rounded-lg outline outline-1 outline-gray ">
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

              <h3 className="mt-2 text-sm font-bold md:text-base">{name}</h3>
              <p className="line-clamp-3 text-foreground-secondary">
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
                    <Link target="_blank" rel="noopener noreferrer" href={link}>
                      <FaExternalLinkAlt className="text-base hover:text-primary lg:text-lg" />
                    </Link>
                  )}

                  {github && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={github}
                    >
                      <FaGithub className="text-base hover:text-primary lg:text-lg" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div
            className="bg-background-primary data-[state=closed]: fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-background-secondary/70 backdrop-blur-sm"
            onClick={(e) => setSelectedProject(null)}
          >
            <motion.div
              layoutId={selectedProject.name}
              className="z-50 w-full max-w-2xl gap-4 border bg-background-secondary p-6 shadow-lg sm:rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h5>{selectedProject.subtitle}</motion.h5>
              <motion.h2>{selectedProject.name}</motion.h2>
              <motion.button onClick={() => setSelectedProject(null)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsList;
