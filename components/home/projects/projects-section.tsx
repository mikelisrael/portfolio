"use client";

import { IPageInfo, IProject } from "@/types";
import { AnimatedUpComponent } from "../../general/animated-components";
import { useGlobalContext } from "../../providers/context";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { GiEmptyHourglass } from "react-icons/gi";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Projects: React.FC<IPageInfo> = ({
  projectInvitation,
  projectInvitationHeading,
}) => {
  const { projectTopRef, projectBottomRef } = useGlobalContext();
  const projects: IProject[] = [
    {
      name: "Techworld gadgets",
      subtitle: "Inventory mgt.",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "",
      github: "",
      isPrivate: true,
    },
    {
      name: "Tabs",
      subtitle: "inventory mgt.",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "/img/project1.jpg",
      github: "",
      isPrivate: true,
      link: "https://www.trulyao.dev",
    },
    {
      name: "Flamestar",
      subtitle: "Fintech",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/img/project.png",
      github: "",
    },
  ];

  return (
    <>
      <section
        id="projects"
        className="universal_x relative isolate grid gap-10 overflow-hidden py-20 md:grid-cols-2 md:py-40 lg:gap-20 xl:gap-40"
      >
        <div>
          <div ref={projectTopRef} />
          <AnimatedUpComponent>
            <h6 className="text-xs tracking-[0.2em] text-foreground-secondary md:text-sm">
              - Portfolio
            </h6>
          </AnimatedUpComponent>

          <AnimatedUpComponent>
            <h2
              aria-label="about"
              className="mb-7 mt-3 text-balance text-xl font-semibold capitalize sm:text-3xl"
            >
              
              {projectInvitationHeading}
            </h2>{" "}
          </AnimatedUpComponent>

          <AnimatedUpComponent>
            <p className="text-foreground-secondary">{projectInvitation}</p>
          </AnimatedUpComponent>

          <AnimatedUpComponent className="mt-10 md:mt-16">
            <Link
              href="/projects"
              className="group font-bold text-primary hover:underline"
            >
              <span>Explore more</span>{" "}
              <FaArrowRight className="inline-block duration-200 group-hover:translate-x-3" />
            </Link>
          </AnimatedUpComponent>
        </div>

        {projects.map((project, index) => {
          return (
            <AnimatedUpComponent
              key={index}
              threshold={index == 1 ? 0.1 : undefined}
            >
              <article
                className={cn(
                  "h-full w-full justify-self-end overflow-hidden bg-background-secondary",
                  index == 1 && "md:-translate-y-40 lg:-translate-y-80",
                )}
              >
                <header className="m-5 flex items-center justify-between gap-5 md:m-10">
                  <h3 className="text-2xl font-medium lg:text-3xl">
                    {project.name}
                  </h3>
                  <Badge className="shrink-0 bg-background text-right text-xs capitalize md:text-sm">
                    {project.subtitle}
                  </Badge>
                </header>

                <div className="relative mt-10 h-[400px] md:mt-28 md:aspect-[5/4] md:h-auto lg:w-[600px]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={1920}
                      height={1080}
                      className="absolute inset-0 h-full w-full translate-y-10 object-cover md:object-fill lg:-translate-x-10 lg:-rotate-12"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-background/50 lg:-translate-x-5">
                      <GiEmptyHourglass className="-mt-40 translate-y-20 text-3xl text-foreground-secondary lg:-ml-20 lg:translate-y-24" />
                    </div>
                  )}
                </div>
              </article>
            </AnimatedUpComponent>
          );
        })}

        {/* <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div> */}
      </section>
      <div ref={projectBottomRef} />
    </>
  );
};

export default Projects;
