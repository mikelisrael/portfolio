"use client";

import React from "react";
import { useGlobalContext } from "../providers/context";
import moment from "moment";

const Header = () => {
  const { headerRef } = useGlobalContext();

  return (
    <header ref={headerRef} className="relative pt-10 md:pt-0">
      <h2
        aria-label="blog header"
        className="mb-1 mt-3 w-full text-3xl font-semibold duration-500 animate-in fade-in slide-in-from-right-48 sm:text-5xl"
      >
        Stories
      </h2>

      <p className="space-x-2 text-foreground-secondary duration-700 animate-in fade-in slide-in-from-right-48 ">
        <span>{moment().format("Do MMMM, YYYY")}</span>
        <span className="text-lg">•</span>
        <span>3 Stories</span>
      </p>
    </header>
  );
};

export default Header;
