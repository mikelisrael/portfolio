import React, { useState } from "react";
import cn from "classnames";

const activeLink =
  "after:content-[''] after:bg-yellowPrimary after:h-2 after:w-2 after:left-1/2 after:-translate-x-1/2 after:-bottom-4 after:absolute after:rounded-full";

const inactiveLink = "text-gray hover:text-textWhite";

const Navbar = () => {
  // State to track the active link
  const [activeTab, setActiveTab] = useState<"services" | "projects" | "blog">(
    "services"
  );

  const returnClassName = (tab: "services" | "projects" | "blog") => {
    return cn("relative cursor-pointer", {
      [activeLink]: activeTab === tab,
      [inactiveLink]: activeTab !== tab,
    });
  };

  const handleClickedTab = (tab: "services" | "projects" | "blog") => {
    setActiveTab(tab);
  };

  return (
    <nav className="universal_x py-10 flex justify-between">
      <div className="w-16 h-16 bg-yellowPrimary" />

      <ul className="flex text-3xl items-center gap-8">
        <li
          className={returnClassName("services")}
          onClick={() => handleClickedTab("services")}
        >
          Services
        </li>
        <li
          className={returnClassName("projects")}
          onClick={() => handleClickedTab("projects")}
        >
          Projects
        </li>
        <li
          className={returnClassName("blog")}
          onClick={() => handleClickedTab("blog")}
        >
          Blog
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
