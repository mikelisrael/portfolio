"use client";
import React from "react";
import { useGlobalContext } from "../providers/context";

const Header = () => {
  const { headerRef } = useGlobalContext();

  return (
    <header
      ref={headerRef}
      className="universal_x relative flex items-center justify-center pb-10 pt-10 md:pt-0"
    >
      <div className="max-w-2xl space-y-5 text-center">
        <h2
          aria-label="projects header"
          className="mb-1 mt-3 w-full text-3xl font-semibold duration-500 animate-in fade-in slide-in-from-bottom-48 sm:text-5xl"
        >
          Projects
        </h2>
        <p className="text-foreground-secondary duration-700 animate-in fade-in slide-in-from-bottom-48">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A provident
          voluptates cum earum dolorem placeat est quo harum iusto, accusamus
          quasi aspernatur quae autem! At officia accusamus debitis
          necessitatibus facere.
        </p>
      </div>
    </header>
  );
};

export default Header;
