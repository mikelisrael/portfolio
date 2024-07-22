import { urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { useEffect } from "react";
import FocusLock from "react-focus-lock";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { RichTextComponent } from "../blog/rich-text-component";
import BlurImage from "../shared/blur-image";
import { Badge } from "../ui/badge";

const ExpandedProject = ({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: IProject;
  setSelectedProject: (project: IProject | null) => void;
}) => {
  const { name, subtitle, description, image, tools, body, link, github } =
    selectedProject;

  useEffect(() => {
    // set again after 1s to ensure it's set...
    // because router action causes a re-render
    setTimeout(() => {
      document.title = name + " • Michael Israel";
    }, 1000);

    const handlePopState = () => {
      setSelectedProject(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedProject]);

  return (
    <AnimatePresence>
      <FocusLock>
        <div
          key={name}
          className="bg-background-primary fixed inset-0 z-50 flex w-full cursor-pointer items-center justify-center bg-background-secondary/70 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.article
            layoutId={name}
            className="expanded_project prose prose-sm relative h-full w-full max-w-full cursor-default gap-4 overflow-y-scroll bg-background-secondary text-foreground-secondary shadow-lg outline outline-1 outline-gray prose-headings:text-foreground prose-h1:mb-5 prose-h2:mt-5 prose-h3:border-b prose-h3:pb-2 prose-blockquote:border-foreground-secondary prose-blockquote:text-foreground-secondary prose-strong:font-black prose-strong:text-foreground prose-ol:pl-3 prose-ul:pl-3 md:h-[90%] md:w-[90%] md:max-w-2xl md:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky right-10 top-6 z-10 flex justify-end px-6">
              <button
                className="text-2xl "
                onClick={() => setSelectedProject(null)}
              >
                <ImCancelCircle className="text-foreground-secondary hover:text-primary" />
              </button>
            </div>

            <div className="px-6 pt-6">
              <Badge className="shrink-0 bg-background text-right !text-xs capitalize md:text-sm">
                {subtitle}
              </Badge>
              <div className="flex">
                <h2>{name}</h2>
                <div className="ml-3 flex items-center gap-3">
                  {github && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={github}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="text-base text-foreground-secondary hover:text-primary lg:text-lg" />
                    </Link>
                  )}

                  {link && (
                    <Link
                      target={
                        link &&
                        link.startsWith("http") &&
                        !link.startsWith("https")
                          ? "_self"
                          : "_blank"
                      }
                      rel="noopener noreferrer"
                      href={link}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="text-base text-foreground-secondary hover:text-primary lg:text-lg" />
                    </Link>
                  )}
                </div>
              </div>
              <motion.p>{description}</motion.p>
            </div>

            <motion.div className="relative">
              <BlurImage
                src={urlForImage(image)}
                alt={name}
                width={1920}
                height={1080}
                className="aspect-video w-full object-cover"
              />

              {tools && tools.length > 0 && (
                <div className="absolute bottom-0 flex w-full justify-center gap-3 bg-black/20 px-4 py-2">
                  {tools
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((tool, idx) => (
                      <BlurImage
                        unoptimized
                        width={tool.name === "Next.js" ? 50 : 40}
                        height={tool.name === "Next.js" ? 50 : 40}
                        key={idx}
                        src={urlForImage(tool.toolImage)}
                        alt={tool.name}
                        className="!m-0 object-contain"
                        title={tool.name}
                      />
                    ))}
                </div>
              )}
            </motion.div>

            <div className="px-6 pb-6">
              {body && (
                <PortableText value={body} components={RichTextComponent} />
              )}
            </div>
          </motion.article>
        </div>
      </FocusLock>
    </AnimatePresence>
  );
};

export default ExpandedProject;
