"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGlobalContext } from "../providers/context";
import { buttonVariants } from "../ui/button";

const words = ["Projects"];

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

const Header = ({ intro, resumeURL }: { intro: string; resumeURL: string }) => {
  const { headerRef } = useGlobalContext();

  const letters = "Projects".split("");

  return (
    <header ref={headerRef} className="universal_x relative overflow-hidden">
      <div className="relative space-y-6">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Portfolio
          </span>
        </motion.div>

        {/* Animated title */}
        <div
          aria-label="projects header"
          className="perspective-[800px] flex overflow-hidden pb-3"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block origin-top text-4xl font-black tracking-tight text-foreground sm:text-6xl"
              style={{ display: letter === " " ? "inline" : "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full bg-gradient-to-r from-primary via-primary/50 to-transparent"
        />

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="max-w-lg text-balance text-sm md:text-base leading-relaxed text-foreground-secondary"
        >
          {intro}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href={`${resumeURL}?dl=`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "group relative w-48 overflow-hidden border border-primary/30 bg-primary/10 text-primary backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/20 hover:text-amber-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10 flex items-center gap-2">
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
