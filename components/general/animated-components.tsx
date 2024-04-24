"use client";

import { LazyMotion, domAnimation, motion } from "framer-motion";
import React from "react";

interface AnimatedComponentProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  x?: number;
}

export const AnimatedUpComponent = ({
  children,
  delay,
  threshold,
  className,
}: AnimatedComponentProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 + (delay || 0) }}
        viewport={{ once: true, amount: threshold || 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};

export const AnimatedLeftComponent = ({
  children,
  delay,
  className,
  threshold,
  x,
}: AnimatedComponentProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ x: x || 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 + (delay || 0) }}
        viewport={{ once: true, amount: threshold || 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};
