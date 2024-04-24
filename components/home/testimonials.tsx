"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  AnimatedLeftComponent,
  AnimatedUpComponent,
} from "../general/animated-components";
import Image from "next/image";
import { IPageInfo } from "@/types";
import { blurUpImage, urlForImage } from "@/sanity/lib/image";

const Testimonials: React.FC<IPageInfo> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="scroll-m-20 bg-background-secondary pb-24 md:pb-40">
      <div className="universal_x grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-10 lg:gap-32">
        <AnimatedUpComponent threshold={0.2}>
          {/* Testimonial Image */}
          <Image
            src={urlForImage(testimonials[activeIndex].photo)}
            placeholder="blur"
            blurDataURL={blurUpImage(testimonials[activeIndex].photo)}
            width={350}
            height={400}
            alt={`testimonial-${activeIndex}`}
            className="size-[150px] rounded-full object-cover brightness-110 contrast-[1.1] grayscale filter sm:size-[200px] md:h-[400px] md:w-[350px] md:rounded-none"
          />
        </AnimatedUpComponent>

        <div className="flex min-h-full flex-col justify-between gap-y-5">
          <div>
            {/* Testimonial Quote */}
            <AnimatedUpComponent>
              <RiDoubleQuotesL className="text-5xl text-foreground-secondary/50" />
            </AnimatedUpComponent>

            <AnimatedUpComponent>
              <p className="mt-3 font-medium sm:text-base md:text-lg lg:text-xl">
                {testimonials[activeIndex].quote}
              </p>
            </AnimatedUpComponent>

            {/* Testimonial author */}
            <AnimatedUpComponent threshold={0.2}>
              <h6 className="mt-5 text-sm font-semibold md:mt-10 md:text-lg">
                {testimonials[activeIndex].name}
              </h6>
            </AnimatedUpComponent>

            {/* Testimonial position */}
            <AnimatedUpComponent threshold={0.2}>
              <span className="text-xs text-foreground-secondary md:text-sm">
                {testimonials[activeIndex].position}
              </span>
            </AnimatedUpComponent>
          </div>

          {/* Controls Buttons */}
          <div className="flex gap-5">
            {testimonials.map((_, index) => (
              <AnimatedLeftComponent key={index} delay={index * 0.3} x={50}>
                <motion.button
                  whileTap={{ scale: 2 }}
                  className={cn(
                    "h-3 w-14 bg-foreground-secondary/50 transition-all duration-200 ease-in-out md:w-20",
                    activeIndex === index && "bg-primary",
                  )}
                  onClick={() => handleButtonClick(index)}
                />
              </AnimatedLeftComponent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
