"use client";

import { cn } from "@/lib/utils";
import { IPageInfo } from "@/types";
import React, { useEffect, useState } from "react";
import BlurImage from "../shared/blur-image";
import HeaderRef from "../shared/section-refs/header-ref";
import Socials from "../shared/socials";
import { Spotlight } from "./spotlight";

const Hero: React.FC<IPageInfo> = ({
  name,
  introductionHeading,
  introduction,
  socials,
  subjectImage,
  availableForWork,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll: EventListener = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const relX = ((e.clientX - left) / width) * 2 - 1;
    const relY = ((e.clientY - top) / height) * 2 - 1;

    setTilt({
      x: relY * 1.5, // top/bottom tilt
      y: relX * 2, // left/right lean
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const [firstName, lastName] = name.split(" ");

  return (
    <HeaderRef
      role="banner"
      className="universal_x relative isolate grid py-10 md:grid-cols-2"
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Spotlight className="-top-40 left-0 md:-top-20" fill="#FFF0A0" />

      {/* image */}
      {/* Tilt wrapper: pivots from bottom center, no clipping */}
      <div
        role="img"
        className="absolute bottom-0 left-auto right-0 -z-10 w-[32rem] md:left-[15%] md:right-auto lg:left-[20%] xl:w-[36rem]"
        style={{
          transformOrigin: "bottom center",
          transform: `perspective(1200px) rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* Clip box: contains the image so scroll parallax never bleeds outside */}
        <div className="relative size-full overflow-hidden">
          {/* Scroll parallax: moves image upward as user scrolls */}
          <div style={{ transform: `translateY(${scrollPosition * 0.4}px)` }}>
            <div className="duration-700 animate-in fade-in slide-in-from-bottom-[30%] slide-in-from-left-[30%]">
              <BlurImage
                priority
                width={1000}
                height={1000}
                src={"/img/israel4.png"}
                alt={subjectImage.alt}
                aria-label="Michael Israel"
                className="w-full translate-x-[16rem] md:translate-x-0 md:scale-x-100"
              />
            </div>
          </div>
        </div>
      </div>

      <section style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }}>
        {availableForWork && (
          <div className="mb-5 mt-3 flex items-center gap-3 duration-700 animate-in fade-in slide-in-from-right-48">
            <div className="relative flex items-center">
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-green-500 opacity-75"></div>
              <div className="relative h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-foreground-secondary">
              Available for work
            </span>
          </div>
        )}

        <div className="relative">
          <h1
            role="heading"
            aria-level={1}
            className={cn(
              "relative text-6xl font-medium duration-500 animate-in fade-in slide-in-from-right-48 sm:text-7xl md:pt-3 lg:text-8xl xl:text-9xl",
              availableForWork && "md:pt-0",
            )}
          >
            {firstName}{" "}
            <span className="block -translate-y-2 md:-translate-y-4 lg:-translate-y-6">
              {lastName}.
            </span>
          </h1>
          {/* underline */}
          <div
            data-aos-delay="150"
            className="absolute -bottom-4 h-2 w-[15%] bg-primary duration-700 content-[''] animate-in fade-in slide-in-from-right-32 md:w-[20%] lg:h-4"
          ></div>
        </div>

        {/* icons */}
        <ul
          role="list"
          aria-label="social media links"
          className="mt-16 flex w-max gap-5 pr-2 text-xl backdrop-blur-md md:mt-32 md:gap-8"
        >
          <Socials socials={socials} />
        </ul>
      </section>

      <section
        role="complementary"
        className="flex h-max justify-start pt-10 md:justify-end md:pt-3"
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }}
      >
        <div className="backdrop-blur sm:max-w-sm md:px-2">
          <h6 className="text-xs tracking-[0.2em] text-foreground-secondary duration-500 animate-in fade-in slide-in-from-right-48 md:text-sm">
            - Introduction
          </h6>

          <h2
            aria-label="about"
            className="mb-4 mt-3 text-balance font-serif text-xl duration-700 animate-in fade-in slide-in-from-right-48 sm:text-3xl md:mb-10"
          >
            {introductionHeading}
          </h2>

          <p
            className="text-foreground-secondary duration-700 animate-in fade-in slide-in-from-right-48"
            aria-label="description"
            aria-labelledby="about"
          >
            {introduction}
          </p>
        </div>
      </section>
    </HeaderRef>
  );
};

export default Hero;
