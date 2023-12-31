import { IProps } from "@/pages";
import styles from "@/styles/Animations.module.css";
import cn from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

type Link = {
  path: "contact" | "projects" | "blog";
  label: string;
};

const Navbar: React.FC<IProps> = ({
  headerInView,
  contactInView,
  projectInView,
  blogInView,
}) => {
  const [isIndicatorMoved, setIsIndicatorMoved] = useState(false);
  // State to track the active link
  const [activeTab, setActiveTab] = useState<"contact" | "projects" | "blog">(
    "contact",
  );
  const indicatorRef = useRef<HTMLLIElement>(null);
  const [isLinksLoaded, setIsLinksLoaded] = useState(false);
  const router = useRouter();

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
    { path: "contact", label: "Contact" },
    { path: "projects", label: "Projects" },
    { path: "blog", label: "Blog" },
  ];

  const returnClassName = (tab: "contact" | "projects" | "blog") => {
    return cn("relative cursor-pointer", {
      ["text-textWhite"]: activeTab === tab,
      ["text-gray hover:text-textWhite"]: activeTab !== tab,
    });
  };

  const handleClickedTab = (tab: "contact" | "projects" | "blog") => {
    setActiveTab(tab);
    goToPath(tab);
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

  const navBarClassName = cn(
    "universal_x py-2 md:py-5 my-5 flex justify-between z-30",
    {
      [" sticky top-0 border-gray border backdrop-blur-md rounded-xl " +
      styles.dropDown]: !headerInView, //backdrop-blur-md
    },
  );

  function goToPath(path: string) {
    const element = document.getElementById(path);

    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      // add path to url as query and don't go back to top of page
      router.push(`/?path=${path}`, undefined, { shallow: true });
    }
  }

  // NOTE: This useEffect is for when the user visits the page
  useEffect(() => {
    const path = router.query.path; // Get the path from the query parameter
    if (path) {
      // setActiveTab(path as "contact" | "projects" | "blog");
      const element = document.getElementById(
        path as "contact" | "projects" | "blog",
      );
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [router.query.path]);

  //NOTE: This useEffect is for when the user scrolls
  useEffect(() => {
    if (contactInView) {
      setActiveTab("contact");
    }

    if (projectInView) {
      setActiveTab("projects");
    }

    if (blogInView) {
      setActiveTab("blog");
    }
  }, [contactInView, projectInView, blogInView]);

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={navBarClassName}
    >
      {/* add class above for blur: backdrop-blur-md  */}
      <div
        className={cn(styles.scaleUp + " cursor-pointer bg-yellowPrimary", {
          ["h-16 w-16"]: headerInView,
          ["h-10 w-10"]: !headerInView,
        })}
        onClick={() => {
          // scroll to top
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />

      <ul
        role="menubar"
        className={cn(
          "relative z-30 flex select-none items-center gap-3 text-lg sm:gap-5 sm:text-xl md:gap-8 md:text-3xl",
          {
            ["pb-2 md:pb-3"]: !headerInView,
          },
        )}
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
          className={cn(
            {
              "opacity-100": isIndicatorMoved,
              "opacity-0": !isIndicatorMoved,
            },
            "indicator absolute bottom-0 h-2 w-2 rounded-full bg-yellowPrimary transition-all delay-200 md:-bottom-2",
          )}
        ></li>
      </ul>
    </nav>
  );
};

export default Navbar;
