import Image from "next/image";
import React, { useEffect, useRef } from "react";

type Stack = {
  title: string;
  img: string;
};

const Stacks = () => {
  const titles = [
    "HTML",
    "CSS",
    "Javascript",
    "Nodejs",
    "Typescript",
    "React",
    "Nextjs",
    "Git",
    "Sanity",
    "Postman",
    "Figma",
    "Tailwind",
    "Photoshop",
    "Illustrator",
  ];

  const duplicatedTitles = [...titles, ...titles, ...titles];

  const stacks: Stack[] = duplicatedTitles.map((title) => ({
    title,
    img: `/img/tools/${title.toLowerCase()}.png`,
  }));

  // Create a ref to the container to access its DOM element
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle the infinite scrolling effect
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerScrollWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;

        if (scrollLeft + containerWidth >= containerScrollWidth) {
          // If the container has reached the end, scroll back to the beginning
          container.scrollLeft = 0;
        } else {
          // Otherwise, continue scrolling
          container.scrollLeft += 1; // Adjust this value to control the scrolling speed
        }
      }
    };

    // Start the scrolling loop when the component mounts
    let intervalId = setInterval(handleScroll, 50); // Adjust the interval to control the smoothness of the scroll

    // Function to pause scrolling on mouse enter
    const handleMouseEnter = () => {
      clearInterval(intervalId);
    };

    // Function to resume scrolling on mouse leave
    const handleMouseLeave = () => {
      intervalId = setInterval(handleScroll, 50);
    };

    // Add event listeners for mouse enter and mouse leave
    if (containerRef.current) {
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // Clean up the event listeners and interval when the component is unmounted
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mouseenter",
          handleMouseEnter,
        );
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave,
        );
      }
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <section className="relative -mt-10 mb-14 md:-mt-5">
        <div className="absolute left-0 h-full w-full bg-gradient-to-r from-bgPrimary via-transparent to-bgPrimary" />
        <div
          ref={containerRef}
          className="flex items-center gap-x-5 overflow-hidden md:gap-x-10"
        >
          {stacks.map(({ title, img }, index) => {
            return (
              <div key={index} className="min-w-0 flex-shrink-0">
                <Image
                  width={100}
                  height={100}
                  src={img}
                  alt={title}
                  title={title}
                  className="w-10 md:w-12"
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Stacks;
