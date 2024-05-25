"use client";

import React from "react";
import { useGlobalContext } from "@/components/providers/context";

const HeaderRef = ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => {
  const { headerRef } = useGlobalContext();

  return (
    <header ref={headerRef} {...props}>
      {children}
    </header>
  );
};

export default HeaderRef;
