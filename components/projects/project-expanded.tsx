import { urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import FocusLock from "react-focus-lock";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { RichTextComponent } from "../blog/rich-text-component";
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
            <div className="px-6 pt-6">
              <div className="sticky right-10 top-6 z-10 flex justify-end">
                <button
                  className="text-2xl"
                  onClick={() => setSelectedProject(null)}
                >
                  <ImCancelCircle className="text-foreground-secondary" />
                </button>
              </div>

              <Badge className="shrink-0 bg-background text-right !text-xs capitalize md:text-sm">
                {subtitle}
              </Badge>
              <div className="flex">
                <h2>{name}</h2>
                <div className="ml-3 flex items-center gap-3">
                  {link && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={link}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="text-base text-foreground-secondary hover:text-primary lg:text-lg" />
                    </Link>
                  )}

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
                </div>
              </div>
              <motion.p>{description}</motion.p>
            </div>

            <motion.div className="relative">
              <Image
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
                      <Image
                        unoptimized
                        width={tool.name === "Next.js" ? 60 : 50}
                        height={tool.name === "Next.js" ? 60 : 50}
                        key={idx}
                        src={urlForImage(tool.toolImage)}
                        alt={tool.name}
                        className="!m-0 object-contain"
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
