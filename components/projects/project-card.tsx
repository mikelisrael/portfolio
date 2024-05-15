import { cn } from "@/lib/utils";
import { blurUpImage, urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GiEmptyHourglass } from "react-icons/gi";
import { LuMousePointerClick } from "react-icons/lu";
import { AnimatedUpComponent } from "../general/animated-components";

interface IProjectCard {
  project: IProject;
  setSelectedProject: (project: IProject | null) => void;
}

const ProjectCard = ({ project, setSelectedProject }: IProjectCard) => {
  const { name, description, image, link, github, isPrivate, tools } = project;

  return (
    <AnimatedUpComponent threshold={0.2}>
      <motion.article
        layoutId={name}
        className="group flex h-full cursor-pointer flex-col gap-1.5"
        onClick={() => setSelectedProject(project)}
      >
        <div className="relative aspect-video overflow-hidden rounded-lg outline outline-1 outline-gray">
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

          <div className="absolute inset-0 isolate flex flex-col before:absolute before:bottom-0 before:z-[-1] before:h-8 before:w-full before:bg-black/35 before:to-10% before:transition-all before:duration-300 before:group-hover:h-full before:group-hover:bg-black/60">
            <div className="flex flex-1 items-center justify-center font-bold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              Cl
              <LuMousePointerClick size={25} className="mb-2" />
              ck to view project
            </div>

            {tools && tools.length > 0 && (
              <div className="absolute bottom-0 flex w-full justify-end gap-2 px-2 py-1">
                {tools.map((tool, idx) => (
                  <Image
                    unoptimized
                    width={tool.name === "Next.js" ? 30 : 20}
                    height={tool.name === "Next.js" ? 30 : 20}
                    key={idx}
                    src={urlForImage(tool.toolImage)}
                    alt={tool.name}
                    className="object-contain"
                  />
                ))}
              </div>
            )}
          </div>
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
};

export default ProjectCard;
