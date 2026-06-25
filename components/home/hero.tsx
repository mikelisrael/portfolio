"use client";

import { cn } from "@/lib/utils";
import { IPageInfo } from "@/types";
import React, { useEffect, useRef } from "react";
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
  const tiltWrapperRef = useRef<HTMLDivElement>(null);
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const textSection1Ref = useRef<HTMLElement>(null);
  const textSection2Ref = useRef<HTMLElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      // only record the target here — DOM writes happen in the rAF loop below,
      // decoupled from however often/unevenly the browser fires scroll events
      targetScrollY.current = window.scrollY;
    };

    const animate = () => {
      // ease current value toward target every frame — this is what removes
      // the stepping you get from mouse-wheel / fast-fling scroll deltas
      currentScrollY.current +=
        (targetScrollY.current - currentScrollY.current) * 0.08;

      const y = currentScrollY.current;

      if (scrollInnerRef.current) {
        scrollInnerRef.current.style.transform = `translateY(${y * 0.22}px)`;
      }
      if (textSection1Ref.current) {
        textSection1Ref.current.style.transform = `translateY(-${y * 0.15}px)`;
      }
      if (textSection2Ref.current) {
        textSection2Ref.current.style.transform = `translateY(-${y * 0.15}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const relX = ((e.clientX - left) / width) * 2 - 1;
    const relY = ((e.clientY - top) / height) * 2 - 1;

    tiltRef.current = {
      x: relY * 1.5,
      y: relX * 2,
    };

    if (tiltWrapperRef.current) {
      tiltWrapperRef.current.style.transform = `perspective(1200px) rotateX(${-tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`;
    }
  };

  const handleMouseLeave = () => {
    tiltRef.current = { x: 0, y: 0 };
    if (tiltWrapperRef.current) {
      tiltWrapperRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
    }
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

      {/* Tilt wrapper: only handles mouse tilt, no scroll */}
      <div
        ref={tiltWrapperRef}
        role="img"
        className="absolute bottom-0 left-auto right-0 -z-10 w-[32rem] md:left-[15%] md:right-auto lg:left-[20%] xl:w-[36rem]"
        style={{
          transformOrigin: "bottom center",
          willChange: "transform",
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* Clip box: overflow-hidden masks the scroll parallax so image never bleeds */}
        <div className="relative size-full overflow-hidden">
          {/* Scroll inner: translateY moves image upward inside the clip mask */}
          <div ref={scrollInnerRef} style={{ willChange: "transform" }}>
            <div className="duration-700 animate-in fade-in slide-in-from-bottom-[30%] slide-in-from-left-[30%]">
              <BlurImage
                priority
                width={1000}
                height={1000}
                src={"/img/israel4.png"}
                alt={subjectImage.alt}
                aria-label="Israel Michael-Ipinko"
                className="w-full translate-x-[16rem] md:translate-x-0 md:scale-x-100"
              />
            </div>
          </div>
        </div>
      </div>

      <section ref={textSection1Ref} style={{ willChange: "transform" }}>
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
          <div
            data-aos-delay="150"
            className="absolute -bottom-4 h-2 w-[15%] bg-primary duration-700 content-[''] animate-in fade-in slide-in-from-right-32 md:w-[20%] lg:h-4"
          />
        </div>

        <ul
          role="list"
          aria-label="social media links"
          className="mt-16 flex w-max gap-5 pr-2 text-xl backdrop-blur-md md:mt-32 md:gap-8"
        >
          <Socials socials={socials} />
        </ul>
      </section>

      <section
        ref={textSection2Ref}
        role="complementary"
        className="flex h-max justify-start pt-10 md:justify-end md:pt-3"
        style={{ willChange: "transform" }}
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
