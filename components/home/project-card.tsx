import { cn } from "@/lib/utils";
import { IProject } from "@/types";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { AnimatedUpComponent } from "../general/animated-components";

const ProjectCard = ({
  name,
  description,
  image,
  github,
  link,
  isPrivate,
}: IProject) => {
  return (
    <AnimatedUpComponent>
      <article className="group flex h-full flex-col gap-1.5">
        <div className="block aspect-[1.5] h-56 overflow-hidden rounded-lg outline outline-1 outline-gray ">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-all duration-200 ease-in-out group-focus-within:scale-125 group-hover:scale-125 group-focus:scale-125"
          />
        </div>

        <h3 className="mt-2 text-sm font-bold md:text-base">{name}</h3>
        <p className="text-textGray">{description}</p>

        <div
          className={cn("mt-auto flex items-center py-7", {
            "justify-between": isPrivate,
            "justify-end": !isPrivate,
          })}
        >
          {isPrivate && (
            <span className="text-gray-400 bg-secondary-background px-4 py-0.5 text-[10px] tracking-wider">
              PRIVATE
            </span>
          )}

          <div className="flex items-center gap-3">
            {link && (
              <a href={link}>
                <FaExternalLinkAlt className="text-base hover:text-primary lg:text-lg" />
              </a>
            )}

            <a href={github}>
              <FaGithub className="text-base hover:text-primary lg:text-lg" />
            </a>
          </div>
        </div>
      </article>
    </AnimatedUpComponent>
  );
};

export default ProjectCard;
