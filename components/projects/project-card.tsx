import { cn } from "@/lib/utils";
import { IProject } from "@/types";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GiEmptyHourglass } from "react-icons/gi";
import { AnimatedUpComponent } from "../general/animated-components";
import Link from "next/link";

const ProjectCard = ({
  name,
  description,
  image,
  github,
  link,
  isPrivate,
}: IProject) => {
  return (
    <AnimatedUpComponent threshold={0.2}>
      <article className="group flex h-full flex-col gap-1.5">
        <div className="block aspect-[1.5] h-56 overflow-hidden rounded-lg outline outline-1 outline-gray ">
          {image ? (
            <Image
              src={image}
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
        <p className="text-foreground-secondary">{description}</p>

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
              <Link target="_blank" rel="noopener noreferrer" href={github}>
                <FaGithub className="text-base hover:text-primary lg:text-lg" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </AnimatedUpComponent>
  );
};

export default ProjectCard;
