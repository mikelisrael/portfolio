import React from "react";
import Balancer from "react-wrap-balancer";
import { FaGithub, FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

type Social = {
  name: string;
  link: string;
  Icon: React.ReactNode;
};

const Header = () => {
  const socials: Social[] = [
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
    <header
      role="banner"
      className="universal_x relative grid md:grid-cols-2 py-10 isolate"
    >
      {/* image */}
      <div
        role="img"
        className="absolute hidden md:block bottom-0 -z-10 left-[15%] lg:left-[20%] w-[32rem] xl:w-[36rem]"
        onContextMenu={(e) => e.preventDefault()} // prevent right click
      >
        <Image
          priority
          width={1000}
          height={1000}
          src="/img/israel2.png"
          className="w-full hidden md:block"
          alt="Michael Israel"
          aria-label="Michael Israel"
        />
      </div>

      <section>
        <h1
          role="heading"
          aria-level={1}
          className="relative text-7xl lg:text-8xl xl:text-9xl font-black md:pt-10 after:absolute after:content-[''] after:-bottom-4 after:bg-yellowPrimary after:h-2 lg:after:h-4 after:w-[15%] md:after:w-[20%]"
        >
          Israel{" "}
          <span className="block -translate-y-2 md:-translate-y-4 lg:-translate-y-6">
            Michael.
          </span>
        </h1>

        {/* icons */}
        <ul
          role="list"
          aria-label="social media links"
          className="mt-16 md:mt-32 text-xl flex gap-5 md:gap-8 backdrop-blur-md w-max pr-2"
        >
          {socials.map(({ name, link, Icon }) => (
            <li key={name} aria-label={name} title={name} role="listitem">
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

      <section role="complementary" className="pt-10 flex justify-end">
        <div className="md:max-w-xs backdrop-blur md:px-2">
          <h4 className="tracking-[0.2em] md:text-sm text-textGray">
            - Introduction
          </h4>
          <h2
            aria-label="about"
            className="text-2xl sm:text-3xl mt-3 mb-7 md:mb-10 font-semibold"
          >
            <Balancer>
              Web developer and product designer based in Nigeria.
            </Balancer>
          </h2>

          <p
            className="text-textGray"
            aria-label="description"
            aria-labelledby="about"
          >
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
