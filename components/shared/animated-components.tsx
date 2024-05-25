"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

interface AnimatedComponentProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  x?: number;
  as?: keyof typeof m;
}

export const AnimatedUpComponent = ({
  as = "div",
  children,
  delay,
  threshold,
  className,
}: AnimatedComponentProps) => {
  const Tag = m[as];

  return (
    <LazyMotion features={domAnimation}>
      <Tag
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 + (delay || 0) }}
        viewport={{ once: true, amount: threshold || 0.5 }}
        className={className}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
};

export const AnimatedLeftComponent = ({
  as = "div",
  children,
  delay,
  className,
  threshold,
  x,
}: AnimatedComponentProps) => {
  const Tag = m[as];

  return (
    <LazyMotion features={domAnimation}>
      <Tag
        initial={{ x: x || 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 + (delay || 0) }}
        viewport={{ once: true, amount: threshold || 0.5 }}
        className={className}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
};
