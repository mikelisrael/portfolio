"use client";

import { IPageInfo } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Socials from "../general/socials";
import { useGlobalContext } from "../providers/context";
import urlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { urlForImage } from "@/sanity/lib/image";

const Hero: React.FC<IPageInfo> = ({
  name,
  introductionHeading,
  introduction,
  socials,
  subjectImage,
}) => {
  const { headerRef } = useGlobalContext();
  // Add state to track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Add a scroll event listener to update the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [firstName, lastName] = name.split(" ");

  return (
    <header
      ref={headerRef}
      role="banner"
      className="universal_x relative isolate grid py-10 md:grid-cols-2"
      id="home"
    >
      {/* image */}
      <div
        role="img"
        className="absolute bottom-0 left-auto right-0 -z-10 w-[32rem] overflow-hidden md:left-[15%] md:right-auto lg:left-[20%] xl:w-[36rem]"
      >
        <div className="size-full duration-500 animate-in fade-in-0 slide-in-from-bottom-[30%] slide-in-from-left-[30%]">
          <Image
            priority
            width={1000}
            height={1000}
            src={urlForImage(subjectImage)}
            alt={subjectImage.alt}
            className="w-full translate-x-[16rem] -scale-x-100 md:translate-x-0 md:scale-x-100"
            aria-label="Michael Israel"
          />
        </div>
        {/* block image */}
        <div className="absolute inset-0" />
      </div>

      <section
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }} //parallax scroll
      >
        <div className="relative">
          <h1
            role="heading"
            aria-level={1}
            className="relative text-6xl font-medium duration-300 animate-in fade-in slide-in-from-right-48 sm:text-7xl md:pt-10 lg:text-8xl xl:text-9xl"
          >
            {firstName}{" "}
            <span className="block -translate-y-2 md:-translate-y-4 lg:-translate-y-6">
              {lastName}.
            </span>
          </h1>
          {/* underline */}
          <div
            data-aos-delay="150"
            className="absolute -bottom-4 h-2 w-[15%] bg-primary duration-500 content-[''] animate-in fade-in slide-in-from-right-32 md:w-[20%] lg:h-4"
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
        className="flex justify-start pt-10 md:justify-end"
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }} // parallax scroll
      >
        <div className="backdrop-blur sm:max-w-sm md:px-2">
          <h6 className="text-foreground-secondary text-xs tracking-[0.2em] duration-300  animate-in  fade-in slide-in-from-right-48 md:text-sm">
            - Introduction
          </h6>

          <h2
            aria-label="about"
            className="mb-1 mt-3 text-balance text-xl font-medium duration-500 animate-in fade-in slide-in-from-right-48 sm:mb-4 sm:text-3xl md:mb-10"
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
    </header>
  );
};

export default Hero;
