import { urlForImage } from "@/sanity/lib/image";
import { IProject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { RichTextComponent } from "../blog/rich-text-component";
import BlurImage from "../shared/blur-image";

const ExpandedProject = ({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: IProject;
  setSelectedProject: (project: IProject | null) => void;
}) => {
  const { name, subtitle, description, image, tools, body, link, github } =
    selectedProject;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handlePopState = () => setSelectedProject(null);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedProject]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <FocusLock>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] flex cursor-pointer items-center justify-center bg-black/80 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          {/* Modal */}
          <motion.article
            className="relative z-[100000] h-full w-full max-w-full cursor-default overflow-hidden bg-[#0d0d0d] shadow-[0_40px_120px_rgba(0,0,0,0.8)] md:h-[92%] md:w-[88%] md:max-w-2xl md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />

            {/* Scrollable content */}
            <div className="relative z-10 h-full overflow-y-auto">
              {/* Close button */}
              <div className="sticky right-0 top-0 z-30 flex justify-end p-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Header info */}
              <div className="px-8 pb-6 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-3 flex items-center gap-3"
                >
                  <div className="h-px w-6 bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                    {subtitle}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {name}
                  </h2>

                  <div className="flex items-center gap-3">
                    {github && (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={github}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-white/50 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                      >
                        <FaGithub className="text-sm" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">
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
                        className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary transition-all hover:border-primary hover:bg-primary/20"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">
                          Live
                        </span>
                      </Link>
                    )}
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-4 text-sm leading-relaxed text-white/50"
                >
                  {description}
                </motion.p>
              </div>

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="relative overflow-hidden"
              >
                <div className="relative aspect-video">
                  <BlurImage
                    src={urlForImage(image)}
                    alt={name}
                    width={1920}
                    height={1080}
                    className="h-full w-full object-cover"
                  />
                  {/* Image overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </div>

                {/* Tools */}
                {tools && tools.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="flex flex-wrap items-center gap-2 px-8 py-5"
                  >
                    <span className="mr-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
                      Built with
                    </span>
                    {tools
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((tool, idx) => (
                        <div
                          key={idx}
                          title={tool.name}
                          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 backdrop-blur-sm"
                        >
                          <BlurImage
                            unoptimized
                            width={14}
                            height={14}
                            src={urlForImage(tool.toolImage)}
                            alt={tool.name}
                            className="object-contain"
                          />
                          <span className="text-[10px] font-medium text-white/40">
                            {tool.name}
                          </span>
                        </div>
                      ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Rich text body */}
              {body && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="prose prose-sm prose-invert max-w-none px-8 pb-12 prose-headings:text-white prose-h2:mt-8 prose-h2:text-xl prose-h2:font-black prose-h3:border-b prose-h3:border-white/10 prose-h3:pb-2 prose-h3:text-base prose-h3:font-bold prose-p:leading-relaxed prose-p:text-white/50 prose-a:text-primary prose-a:no-underline hover:prose-a:text-amber-300 prose-blockquote:border-primary/40 prose-blockquote:text-white/40 prose-strong:font-bold prose-strong:text-white prose-ol:pl-3 prose-ul:pl-3"
                >
                  <PortableText value={body} components={RichTextComponent} />
                </motion.div>
              )}
            </div>
          </motion.article>
        </motion.div>
      </FocusLock>
    </AnimatePresence>,
    document.body,
  );
};

export default ExpandedProject;
