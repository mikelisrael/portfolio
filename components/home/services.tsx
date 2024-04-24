"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { FaLaptop, FaPenNib } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { AnimatedUpComponent } from "../general/animated-components";
import { motion } from "framer-motion";

type Service = {
  title: string;
  Icon: IconType;
};

const servicesData: Service[] = [
  {
    title: "Responsive Design",
    Icon: FaLaptop,
  },
  {
    title: "UI/UX optimization",
    Icon: FaPenNib,
  },
  {
    title: "Secure development",
    Icon: MdSecurity,
  },
];

const fadeInVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 * index },
  }),
};

const Services = () => {
  return (
    <ul className="universal_x grid -translate-y-32 gap-5 sm:grid-cols-3">
      {servicesData.map(({ title, Icon }, index) => {
        const [firstWord, ...rest] = title.split(" ");

        return (
          <motion.li
            className={cn(
              "grid h-80 place-items-center items-end  bg-bgTertiary px-2 py-10 font-medium lg:p-10",
              index == 0 && "bg-primary font-bold text-secondary-foreground",
            )}
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            <div className="flex items-start justify-center gap-4 lg:gap-7">
              <Icon className="text-xl" />
              <div className="-translate-y-1 space-y-3">
                <h2 className="text-2xl capitalize sm:text-xl lg:text-3xl">
                  {firstWord} <br /> {rest.join(" ")}
                </h2>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default Services;
