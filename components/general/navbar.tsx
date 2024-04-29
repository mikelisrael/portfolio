"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../providers/context";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
type Link = {
  path: "contact" | "projects" | "blog";
  label: string;
};

// Array to hold link details
const linkList: Link[] = [
  { path: "contact", label: "Contact" },
  { path: "projects", label: "Projects" },
  { path: "blog", label: "Blog" },
];

const Navbar = () => {
  const {
    headerInView,
    contactInView,
    projectTopInView,
    projectBottomInView,
    blogInView,
    isFooterAndNavHidden,
  } = useGlobalContext();
  const [isIndicatorMoved, setIsIndicatorMoved] = useState(false);
  // State to track the active link
  const [activeTab, setActiveTab] = useState<"contact" | "projects" | "blog">(
    "contact",
  );
  const indicatorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  function goToPath(path: string) {
    const element = document.getElementById(path);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    // Move the indicator after 2 seconds if it's the first page load
    if (!isIndicatorMoved) {
      const timeoutId = setTimeout(() => {
        moveIndicator();
        setIsIndicatorMoved(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      // If it's not the first page load, move the indicator immediately
      moveIndicator();
    }
  }, [activeTab, isIndicatorMoved]);

  // Set active tab on scroll
  useEffect(() => {
    if (contactInView) {
      setActiveTab("contact");
    }

    if (projectTopInView || projectBottomInView) {
      setActiveTab("projects");
    }

    if (blogInView) {
      setActiveTab("blog");
    }
  }, [contactInView, projectTopInView, projectBottomInView, blogInView]);

  function moveIndicator() {
    if (indicatorRef.current) {
      const activeTabElement =
        indicatorRef.current.parentElement!.querySelector(
          `[data-tab="${activeTab}"]`,
        );
      if (activeTabElement) {
        const parentRect =
          indicatorRef.current.parentElement!.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        const offsetX =
          activeTabRect.left - parentRect.left + activeTabRect.width / 2;
        indicatorRef.current.style.transform = `translateX(${offsetX}px)`;
      }
    }
  }

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("contact");
    } else {
      setActiveTab(pathname.slice(1) as "projects" | "blog");
    }
  }, [pathname]);

  const handleClickedTab = (tab: "contact" | "projects" | "blog") => {
    setActiveTab(tab);
    if (tab === "contact") {
      router.push("/");
      return;
    }
    router.push(`/${tab}`);
  };

  // Hide the navbar on certain pages
  if (isFooterAndNavHidden) return null;

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={cn(
        "universal_x z-30 my-5 flex justify-between py-2 md:py-5",
        !headerInView &&
          "sticky top-0 rounded-xl border border-gray backdrop-blur-md duration-500 animate-in slide-in-from-top-10 ",
      )}
    >
      <Link href="/" onClick={() => setActiveTab("contact")}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 180, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className={cn(
            "relative size-16 cursor-pointer duration-200",
            !headerInView && "size-10",
          )}
        >
          <Image src="/logo.png" alt="logo" fill />
        </motion.div>
      </Link>

      <div
        role="menubar"
        className={cn(
          "relative z-30 flex select-none items-center gap-3 text-lg sm:gap-5 sm:text-xl md:gap-8 md:text-3xl",
          {
            ["pb-2 md:pb-3"]: !headerInView,
          },
        )}
      >
        {linkList.map(({ path, label }, idx) => (
          <button
            key={idx}
            role="menuitem"
            tabIndex={0}
            data-tab={path}
            onClick={() => handleClickedTab(path)}
            style={{ animationDuration: `${(idx + 1) * 100 + 300}ms` }}
            className={cn(
              "duration-200 animate-in fade-in slide-in-from-right-32",
              activeTab === path && "text-foreground",
              activeTab !== path && "text-gray hover:text-foreground/70",
            )}
          >
            {label}
          </button>
        ))}

        {/* yellow circle indicator */}
        <div
          role="presentation"
          aria-hidden="true"
          ref={indicatorRef}
          className={cn(
            {
              "opacity-100": isIndicatorMoved,
              "opacity-0": !isIndicatorMoved,
            },
            "absolute bottom-0 h-2 w-2 rounded-full bg-primary transition-all delay-200 md:-bottom-2",
          )}
        />
      </div>
    </nav>
  );
};

export default Navbar;
