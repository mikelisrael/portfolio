import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "@/styles/Animations.module.css";

type Link = {
  key: "services" | "projects" | "blog";
  label: string;
};

const Navbar = () => {
  const [isIndicatorMoved, setIsIndicatorMoved] = useState(false);
  // State to track the active link
  const [activeTab, setActiveTab] = useState<"services" | "projects" | "blog">(
    "services"
  );
  const indicatorRef = useRef<HTMLLIElement>(null);

  // Array to hold link details
  const linkList: Link[] = [
    { key: "services", label: "Services" },
    { key: "projects", label: "Projects" },
    { key: "blog", label: "Blog" },
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
          `[data-tab="${activeTab}"]`
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
        className="flex select-none text-xl md:text-3xl items-center gap-5 md:gap-8 relative"
      >
        {linkList.map(({ key, label }, index) => (
          <li
            key={key}
            role="menuitem"
            tabIndex={activeTab === key ? 0 : -1}
            data-tab={key}
            className={returnClassName(key) + " " + styles.fadeRight}
            onClick={() => handleClickedTab(key)}
            // add variable time
            style={
              {
                "--time": `${index * 0.05 * 0.1}s`,
              } as React.CSSProperties
            }
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
