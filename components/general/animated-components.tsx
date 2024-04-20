import { motion } from "framer-motion";
import React from "react";

interface AnimatedComponentProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

export const AnimatedUpComponent = ({
  children,
  delay,
}: AnimatedComponentProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 + (delay || 0) }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedLeftComponent = ({
  children,
  delay,
  className,
  threshold,
}: AnimatedComponentProps) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 + (delay || 0) }}
      viewport={{ once: true, amount: threshold || 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
