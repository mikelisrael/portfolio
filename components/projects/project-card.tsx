import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GiEmptyHourglass } from "react-icons/gi";
import { AnimatedUpComponent } from "../shared/animated-components";
import BlurImage from "../shared/blur-image";

interface IProjectCard {
  project: IProject;
  setSelectedProject: (project: IProject | null) => void;
}

const ProjectCard = ({ project, setSelectedProject }: IProjectCard) => {
  const { name, description, image, link, github, isPrivate, tools } = project;

  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <AnimatedUpComponent threshold={0.15}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <motion.article
          tabIndex={0}
          className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] outline-offset-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(245,158,11,0.05)]"
          onClick={() => setSelectedProject(project)}
          onKeyPress={(e) => {
            if (e.key === "Enter") setSelectedProject(project);
          }}
        >
          {/* Mouse-follow glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(200px circle at ${x}% ${y}%, rgba(245,158,11,0.08), transparent 70%)`,
              ),
            }}
          />

          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            {image ? (
              <BlurImage
                src={urlForImage(image)}
                alt={name}
                width={500}
                height={500}
                className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                unoptimized
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-white/[0.03]">
                <GiEmptyHourglass className="text-3xl text-foreground-secondary/40" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Click prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
              <motion.div
                initial={false}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-full border border-primary/40 bg-black/60 px-5 py-2.5 backdrop-blur-md"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  View Project
                </span>
                <svg
                  className="h-3 w-3 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Tools bar */}
            {tools && tools.length > 0 && (
              <div className="absolute bottom-0 flex w-full items-center justify-end gap-2 px-4 py-3">
                {tools
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .slice(0, 5)
                  .map((tool, idx) => (
                    <div
                      key={idx}
                      title={tool.name}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-black/50 p-1 backdrop-blur-sm"
                    >
                      <Image
                        unoptimized
                        width={20}
                        height={20}
                        src={urlForImage(tool.toolImage)}
                        alt={tool.name}
                        className="object-contain"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold tracking-tight text-foreground md:text-base">
                {name}
              </h3>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
                  isPrivate
                    ? "bg-white/5 text-white/30"
                    : "bg-primary/10 text-primary",
                )}
              >
                {isPrivate ? "Private" : "Public"}
              </span>
            </div>

            <p className="line-clamp-3 text-xs leading-relaxed text-foreground-secondary/70">
              {description}
            </p>

            {/* Links */}
            {(github || link) && (
              <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-3">
                {github && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={github}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link flex items-center gap-1.5 text-foreground-secondary/50 transition-colors hover:text-primary"
                  >
                    <FaGithub className="text-sm" />
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-0 transition-all duration-200 group-hover/link:opacity-100">
                      Code
                    </span>
                  </Link>
                )}
                {link && (
                  <Link
                    target={
                      link.startsWith("http") && !link.startsWith("https")
                        ? "_self"
                        : "_blank"
                    }
                    rel="noopener noreferrer"
                    href={link}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link flex items-center gap-1.5 text-foreground-secondary/50 transition-colors hover:text-primary"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-0 transition-all duration-200 group-hover/link:opacity-100">
                      Live
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.article>
      </motion.div>
    </AnimatedUpComponent>
  );
};

export default ProjectCard;
