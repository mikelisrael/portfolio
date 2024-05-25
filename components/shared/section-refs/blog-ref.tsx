"use client";

import React from "react";
import { useGlobalContext } from "@/components/providers/context";

const BlogRef = ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => {
  const { blogRef } = useGlobalContext();

  return (
    <section ref={blogRef} {...props}>
      {children}
    </section>
  );
};

export default BlogRef;
