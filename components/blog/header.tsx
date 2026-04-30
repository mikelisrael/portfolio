"use client";

import { getDate } from "@/lib/utils";
import { IPost } from "@/types";
import { motion } from "framer-motion";
import HeaderRef from "../shared/section-refs/header-ref";

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Header = ({ posts }: { posts: IPost[] }) => {
  const letters = "Stories".split("");

  return (
    <HeaderRef className="relative">
      <h2
        aria-label="blog header"
        className="perspective-[800px] mb-1 flex w-full overflow-hidden pb-3"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block origin-top text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
            style={{ display: letter === " " ? "inline" : "inline-block" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
        className="space-x-2 text-foreground-secondary"
      >
        <span>{getDate()}</span>
        <span className="text-lg text-primary">&bull;</span>
        <span>{posts.length} Stories</span>
      </motion.p>
    </HeaderRef>
  );
};

export default Header;
