import { IconType } from "react-icons";
import { FaCube } from "react-icons/fa";
import { FaLaptop, FaPenNib } from "react-icons/fa6";

type Service = {
  title: string;
  projects: number;
  Icon: IconType;
};

const servicesData: Service[] = [
  {
    title: "Web Developer",
    projects: 524,
    Icon: FaLaptop,
  },
  {
    title: "Brand Designer",
    projects: 524,
    Icon: FaPenNib,
  },
  {
    title: "Problem Solving",
    projects: 524,
    Icon: FaCube,
  },
];

const Services = () => {
  return (
    <section className="universal_x grid -translate-y-32 gap-5 sm:grid-cols-3">
      {servicesData.map(({ title, projects, Icon }, index) => {
        const [firstWord, ...rest] = title.split(" ");

        return (
          <article
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="grid h-80 place-items-center items-end bg-bgTertiary px-2 py-10 lg:p-10"
          >
            <div className="flex items-start justify-center gap-4 lg:gap-7">
              <Icon className="text-xl" />
              <div className="-translate-y-2 space-y-3">
                <h2 className="text-2xl font-medium capitalize md:text-xl lg:text-3xl">
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
