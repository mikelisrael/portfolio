import React from "react";
import Balancer from "react-wrap-balancer";
import { FaGithub, FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";

type social = {
  name: string;
  link: string;
  Icon: React.ReactNode;
};

const Header = () => {
  const socials: social[] = [
    {
      name: "Github",
      link: "",
      Icon: <FaGithub />,
    },
    {
      name: "Discord",
      link: "",
      Icon: <FaDiscord />,
    },
    {
      name: "Instagram",
      link: "",
      Icon: <FaInstagram />,
    },
    {
      name: "Twitter",
      link: "",
      Icon: <FaTwitter />,
    },
  ];

  return (
    <header className="universal_x relative grid md:grid-cols-2 py-10 isolate">
      {/* image */}
      <div className="absolute bottom-0 -z-10 hidden md:block left-[15%] lg:left-[20%] w-[30rem] xl:w-[35rem]">
        <img src="/img/israel.png" className="w-full" alt="Michael Israel" />
      </div>

      <section>
        <h1 className="relative text-7xl lg:text-8xl xl:text-9xl font-black md:pt-16 after:absolute after:content-[''] after:-bottom-4 after:bg-yellowPrimary after:h-2 md:after:h-4 after:w-[20%]">
          Israel{" "}
          <span className="block -translate-y-2 md:-translate-y-4 lg:-translate-y-6">
            Michael.
          </span>
        </h1>

        {/* icons */}
        <ul className="mt-16 md:mt-32 text-xl flex gap-5 md:gap-8 backdrop-blur-md w-max pr-2">
          {socials.map(({ name, link, Icon }) => (
            <li key={name} aria-label={name} title={name}>
              <a
                // open new tab
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellowPrimary"
              >
                {Icon}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-16 flex justify-end">
        <div className="md:max-w-xs backdrop-blur md:px-2">
          <h4 className="tracking-[0.2em] md:text-sm text-textGray">
            - Introduction
          </h4>
          <h2 className="text-2xl sm:text-3xl mt-3 mb-7 md:mb-10 font-semibold">
            <Balancer>
              Web developer and product designer based in Nigeria.
            </Balancer>
          </h2>

          <p className="text-textGray">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            iure, numquam omnis excepturi, totam debitis dignissimos unde
            incidunt iste labore delectus a quod sunt vitae! Enim magni totam
            corporis quibusdam?
          </p>
        </div>
      </section>
    </header>
  );
};

export default Header;
