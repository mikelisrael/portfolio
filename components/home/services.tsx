import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { FaLaptop, FaPenNib } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { AnimatedUpComponent } from "../general/animated-components";

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

const Services = () => {
  return (
    <section className="universal_x grid -translate-y-32 gap-5 sm:grid-cols-3">
      {servicesData.map(({ title, Icon }, index) => {
        const [firstWord, ...rest] = title.split(" ");

        return (
          <AnimatedUpComponent key={index} delay={index * 0.5}>
            <article
              className={cn(
                "grid h-80 place-items-center items-end  bg-bgTertiary px-2 py-10 font-medium lg:p-10",
                index == 0 && "bg-primary font-bold text-secondary-foreground",
              )}
            >
              <div className="flex items-start justify-center gap-4 lg:gap-7">
                <Icon className="text-xl" />
                <div className="-translate-y-1 space-y-3">
                  <h2 className="text-2xl capitalize md:text-xl lg:text-3xl">
                    {firstWord} <br /> {rest.join(" ")}
                  </h2>
                </div>
              </div>
            </article>
          </AnimatedUpComponent>
        );
      })}
    </section>
  );
};

export default Services;
