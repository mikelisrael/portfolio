"use client";

import React from "react";
import { useGlobalContext } from "../providers/context";

const Header = ({ intro }: { intro: string }) => {
  const { headerRef } = useGlobalContext();

  return (
    <header ref={headerRef} className="universal_x relative">
      <div className="space-y-5">
        <h2
          aria-label="projects header"
          className="mb-1 mt-3 w-full text-3xl font-semibold duration-500 animate-in fade-in slide-in-from-bottom-48 sm:text-5xl"
        >
          Projects
        </h2>
        <p className="text-foreground-secondary duration-700 animate-in fade-in slide-in-from-bottom-48">
          {intro}
        </p>
      </div>
    </header>
  );
};

export default Header;
