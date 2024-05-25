"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useGlobalContext } from "../providers/context";
import { buttonVariants } from "../ui/button";

const Header = ({ intro, resumeURL }: { intro: string; resumeURL: string }) => {
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
        <Link
          href={`${resumeURL}?dl=`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-44 duration-1000 animate-in fade-in slide-in-from-bottom-48",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </Link>
      </div>
    </header>
  );
};

export default Header;
