import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { ImCancelCircle } from "react-icons/im";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

const ExpandedProject = ({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: IProject;
  setSelectedProject: (project: IProject | null) => void;
}) => {
  const { name, subtitle, description, image, tools } = selectedProject;

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
            className="expanded_project prose prose-sm relative h-full w-full max-w-full cursor-default gap-4 overflow-y-scroll bg-background-secondary text-foreground-secondary shadow-lg outline outline-1 outline-gray prose-headings:text-foreground prose-h1:mb-5 prose-h2:mt-5 prose-h3:border-b prose-h3:pb-2 prose-blockquote:border-foreground-secondary prose-blockquote:text-foreground-secondary prose-strong:font-black prose-strong:text-foreground/70 prose-ol:pl-3 prose-ul:pl-3 md:h-[90%] md:w-[90%] md:max-w-lg md:rounded-lg"
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
              <h2>{name}</h2>
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
                <div className="absolute bottom-0 flex w-full justify-end gap-3 bg-black/20 px-4 py-2">
                  {tools.map((tool, idx) => (
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
              <h3>Features</h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              reprehenderit ipsum tempore officia. Aperiam fuga consectetur ut
              error quisquam, praesentium, consequuntur molestiae possimus enim,
              porro tempora impedit! Animi, laudantium at.
            </div>
          </motion.article>
        </div>
      </FocusLock>
    </AnimatePresence>
  );
};

export default ExpandedProject;
