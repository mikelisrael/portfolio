"use client";

import { urlForImage } from "@/sanity/lib/image";
import { ITool } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  tools: ITool[];
};

const fadeInVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.05 * index },
  }),
};

function TechnologiesClient({ tools }: Props) {
  return (
    <ul className="grid grid-cols-2 flex-wrap items-center justify-center gap-x-10 gap-y-10 sm:gap-x-20 md:flex">
      {tools
        .sort((a, b) => a.priority - b.priority)
        .map((tool, idx) => (
          <motion.li
            className="flex items-center gap-2"
            key={idx}
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={idx}
          >
            <Image
              src={urlForImage(tool.toolImage)}
              alt={tool.name}
              width={100}
              height={100}
              className="size-10 object-contain md:size-12"
            />
            <span className="mt-2">{tool.name}</span>
          </motion.li>
        ))}
    </ul>
  );
}

export default TechnologiesClient;
