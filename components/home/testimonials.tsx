"use client";

import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { IPageInfo } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { AnimatedUpComponent } from "../shared/animated-components";
import BlurImage from "../shared/blur-image";

const SlideInVariants = {
  initial: { opacity: 0, x: 100 },
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2 * index },
  }),
  hover: { scale: 1.25 },
  tap: { scale: 0.9 },
};

const Testimonials: React.FC<IPageInfo> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="scroll-m-20 bg-background-secondary pb-24 md:pb-40">
      <div className="universal_x grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-10 lg:gap-28">
        <AnimatedUpComponent threshold={0.2}>
          {/* Testimonial Image */}
          <BlurImage
            src={urlForImage(testimonials[activeIndex].photo)}
            width={600}
            height={900}
            alt={testimonials[activeIndex].name}
            className="size-[150px] rounded-full object-cover brightness-110 contrast-[1.1] grayscale filter sm:size-[200px] md:h-[400px] md:w-[350px] md:rounded-none"
          />
        </AnimatedUpComponent>

        <div className="flex min-h-full flex-col justify-between gap-y-5">
          <div>
            {/* Testimonial Quote */}
            <AnimatedUpComponent>
              <RiDoubleQuotesL className="text-5xl text-foreground-secondary/50" />
            </AnimatedUpComponent>

            <AnimatedUpComponent
              as="p"
              className="mt-3 font-medium sm:text-base md:text-lg lg:text-xl"
            >
              {testimonials[activeIndex].quote}
            </AnimatedUpComponent>

            {/* Testimonial author */}
            <AnimatedUpComponent
              threshold={0.1}
              as="h6"
              className="mt-5 text-sm font-semibold md:mt-10 md:text-lg"
            >
              {testimonials[activeIndex].name}
            </AnimatedUpComponent>

            {/* Testimonial position */}
            <AnimatedUpComponent
              threshold={0.1}
              as="span"
              className="text-xs text-foreground-secondary md:text-sm"
            >
              {testimonials[activeIndex].position}
            </AnimatedUpComponent>
          </div>

          {/* Controls Buttons */}
          <div className="flex gap-5">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                variants={SlideInVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true }}
                custom={index}
                className={cn(
                  "h-3 w-14 bg-foreground-secondary/50 md:w-20",
                  activeIndex === index && "bg-primary",
                )}
                onClick={() => handleButtonClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
