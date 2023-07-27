import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "@/styles/Animations.module.css";

type Link = {
  path: "services" | "projects" | "blog";
  label: string;
};

const Navbar = () => {
  const [isIndicatorMoved, setIsIndicatorMoved] = useState(false);
  // State to track the active link
  const [activeTab, setActiveTab] = useState<"services" | "projects" | "blog">(
    "services",
  );
  const indicatorRef = useRef<HTMLLIElement>(null);
  const [isLinksLoaded, setIsLinksLoaded] = useState(false);

  // make sure links animation only runs once
  useEffect(() => {
    // Move the indicator after 2 seconds if it's the first page load
    if (!isLinksLoaded) {
      const timeoutId = setTimeout(() => {
        setIsLinksLoaded(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLinksLoaded]);

  const returnAosAnimation = (idx: number) => {
    return !isLinksLoaded
      ? {
          ["data-aos"]: "fade-right",
          ["data-aos-delay"]: `${idx * 50 + 200}`,
        }
      : {};
  };

  // Array to hold link details
  const linkList: Link[] = [
    { path: "services", label: "Services" },
    { path: "projects", label: "Projects" },
    { path: "blog", label: "Blog" },
  ];

  const returnClassName = (tab: "services" | "projects" | "blog") => {
    return cn("relative cursor-pointer", {
      ["text-textWhite"]: activeTab === tab,
      ["text-gray hover:text-textWhite"]: activeTab !== tab,
    });
  };

  const handleClickedTab = (tab: "services" | "projects" | "blog") => {
    setActiveTab(tab);
  };

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

  const moveIndicator = () => {
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
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className="universal_x py-5 my-5 flex justify-between sticky top-0 z-30"
    >
      {/* add class above for blur: backdrop-blur-md  */}
      <div className={styles.scaleUp + " w-16 h-16 bg-yellowPrimary"} />

      <ul
        role="menubar"
        className="flex select-none text-lg sm:text-xl md:text-3xl items-center gap-3 sm:gap-5 md:gap-8 relative"
      >
        {linkList.map(({ path, label }, idx) => (
          <li
            key={idx}
            role="menuitem"
            tabIndex={activeTab === path ? 0 : -1}
            data-tab={path}
            className={returnClassName(path)}
            onClick={() => handleClickedTab(path)}
            {...returnAosAnimation(idx)}
          >
            {label}
          </li>
        ))}

        {/* yellow circle indicator */}
        <li
          role="presentation"
          aria-hidden="true"
          ref={indicatorRef}
          className={`
          ${isIndicatorMoved ? "opacity-100" : "opacity-0"}
          absolute bottom-0 md:-bottom-2 transition-all delay-200 indicator bg-yellowPrimary h-2 w-2 rounded-full`}
        ></li>
      </ul>
    </nav>
  );
};

export default Navbar;
