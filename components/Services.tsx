import React from "react";
import { IconType } from "react-icons";
import { FaCube } from "react-icons/fa";

type Service = {
  title: string;
  projects: number;
  Icon: IconType;
};

const servicesData: Service[] = [
  {
    title: "Product Designer",
    projects: 524,
    Icon: FaCube,
  },
  {
    title: "Web Development",
    projects: 524,
    Icon: FaCube,
  },
  {
    title: "Brand Designer",
    projects: 524,
    Icon: FaCube,
  },
];

const Services = () => {
  return (
    <section className="universal_x grid gap-5 sm:grid-cols-3 -translate-y-32">
      {servicesData.map(({ title, projects, Icon }, index) => {
        const [firstWord, ...rest] = title.split(" ");

        return (
          <article
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="h-80 py-10 px-2 lg:p-10 bg-bgTertiary grid items-end place-items-center"
          >
            <div className="flex items-start gap-4 lg:gap-7 justify-center">
              <Icon className="text-xl" />
              <div className="space-y-3">
                <h2 className="text-xl lg:text-3xl font-medium capitalize">
                  {firstWord} <br /> {rest.join(" ")}
                </h2>
                <p className="text-textGray">{projects} projects</p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Services;
