"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { IPageInfo } from "@/types";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiEmptyHourglass } from "react-icons/gi";
import { useGlobalContext } from "../providers/context";
import { AnimatedUpComponent } from "../shared/animated-components";
import BlurImage from "../shared/blur-image";

const Projects: React.FC<IPageInfo> = ({
  projectInvitation,
  projectInvitationHeading,
  projects,
}) => {
  const { projectTopRef, projectBottomRef } = useGlobalContext();

  return (
    <>
      <section
        id="projects"
        className="universal_x relative isolate grid gap-10 overflow-hidden py-20 md:grid-cols-2 md:py-40 lg:gap-20 xl:gap-40"
      >
        <div>
          <div ref={projectTopRef} />
          <AnimatedUpComponent
            as="h6"
            className="text-xs tracking-[0.2em] text-foreground-secondary md:text-sm"
          >
            - Portfolio
          </AnimatedUpComponent>

          <AnimatedUpComponent
            as="h2"
            className="mb-7 mt-3 text-balance text-xl font-semibold capitalize sm:text-3xl"
          >
            {projectInvitationHeading}
          </AnimatedUpComponent>

          <AnimatedUpComponent as="p" className="text-foreground-secondary">
            {projectInvitation}
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
          const { name, image, description, link, subtitle } = project;
          return (
            <AnimatedUpComponent key={index} threshold={0.2}>
              <Link
                href={link ?? "/projects"}
                rel="noopener noreferrer"
                target={
                  link && link.startsWith("http") && !link.startsWith("https")
                    ? "_self"
                    : "_blank"
                }
                className={cn(
                  "group block h-full w-full justify-self-end overflow-hidden bg-background-secondary outline-2 transition-all duration-300 hover:outline hover:outline-gray",
                  index == 1 && "md:-translate-y-40 lg:-translate-y-80",
                )}
              >
                <header className="m-5 flex items-center justify-between gap-5 md:m-10">
                  <h3 className="text-2xl font-medium group-hover:text-primary group-focus-visible:text-primary lg:text-3xl">
                    {name}.
                  </h3>
                  <Badge className="z-[5] shrink-0 bg-background text-right text-xs capitalize md:text-sm">
                    {subtitle}
                  </Badge>
                </header>

                <p className="mx-5 origin-top-left scale-0 overflow-hidden text-sm text-foreground-secondary transition-transform delay-200 duration-300 group-hover:scale-100 md:mx-10">
                  {description}
                </p>

                <div className="relative mt-10 h-[300px] sm:h-[400px] md:mt-24 md:aspect-[5/4] md:h-auto">
                  {image ? (
                    <BlurImage
                      src={urlForImage(image)}
                      alt={name}
                      width={1920}
                      height={1080}
                      className="absolute inset-0 h-full w-full -rotate-12 scale-125 object-cover transition-all duration-300 group-hover:rotate-0 group-hover:object-left"
                    />
                  ) : (
                    <div className="flex h-full w-full -rotate-12 scale-125 items-center justify-center bg-background/50 transition-transform duration-300 group-hover:rotate-0">
                      <GiEmptyHourglass className="-mt-40 translate-y-20 text-3xl text-foreground-secondary" />
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedUpComponent>
          );
        })}
      </section>
      <div ref={projectBottomRef} />
    </>
  );
};

export default Projects;
