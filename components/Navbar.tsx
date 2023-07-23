import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";

const Navbar = () => {
  // State to track the active link
  const [activeTab, setActiveTab] = useState<"services" | "projects" | "blog">(
    "services"
  );
  const indicatorRef = useRef<HTMLLIElement>(null);

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
    // Move the indicator to the center of the active link when the activeTab changes
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
  }, [activeTab]);

  return (
    <nav className="universal_x py-5 my-5 flex justify-between sticky top-0 z-30">
      {/* add class above for blur: backdrop-blur-md  */}
      <div className="w-16 h-16 bg-yellowPrimary" />

      <ul className="flex text-xl md:text-3xl items-center gap-5 md:gap-8 relative">
        <li
          role="link"
          tabIndex={activeTab === "services" ? 0 : -1}
          data-tab="services"
          className={returnClassName("services")}
          onClick={() => handleClickedTab("services")}
        >
          Services
        </li>
        <li
          role="link"
          tabIndex={activeTab === "projects" ? 0 : -1}
          data-tab="projects"
          className={returnClassName("projects")}
          onClick={() => handleClickedTab("projects")}
        >
          Projects
        </li>
        <li
          role="link"
          tabIndex={activeTab === "blog" ? 0 : -1}
          data-tab="blog"
          className={returnClassName("blog")}
          onClick={() => handleClickedTab("blog")}
        >
          Blog
        </li>

        {/* indicator */}
        <li
          ref={indicatorRef}
          className="absolute bottom-0 md:-bottom-2 transition-all delay-200 indicator bg-yellowPrimary h-2 w-2 rounded-full"
        ></li>
      </ul>
    </nav>
  );
};

export default Navbar;
