import React, { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { FaGithub, FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import styles from "@/styles/Animations.module.css";
import { IProps } from "@/pages";

export type Social = {
  name: string;
  link: string;
  Icon: React.ReactNode;
};

export const socials: Social[] = [
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
    Icon: <FaXTwitter />,
  },
];

const Header: React.FC<IProps> = ({ headerRef }) => {
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
        onContextMenu={(e) => e.preventDefault()} // prevent right click
      >
        <div className={styles.fadeInBottomLeft + " h-full w-full"}>
          <Image
            priority
            width={1000}
            height={1000}
            src="/img/israel3.png"
            className="w-full translate-x-[16rem] -scale-x-100 md:translate-x-0 md:scale-x-100"
            alt="Michael Israel"
            aria-label="Michael Israel"
          />
        </div>
      </div>

      <section
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }} //parallax scroll
      >
        <div className="relative">
          <h1
            data-aos="fade-left"
            role="heading"
            aria-level={1}
            className="relative text-7xl font-black md:pt-10 lg:text-8xl xl:text-9xl"
          >
            Israel{" "}
            <span className="block -translate-y-2 md:-translate-y-4 lg:-translate-y-6">
              Michael.
            </span>
          </h1>
          {/* underline */}
          <div
            data-aos="fade-left"
            data-aos-delay="150"
            className="absolute -bottom-4 h-2 w-[15%] bg-yellowPrimary content-[''] md:w-[20%] lg:h-4"
          ></div>
        </div>

        {/* icons */}
        <ul
          role="list"
          aria-label="social media links"
          className="mt-16 flex w-max gap-5 pr-2 text-xl backdrop-blur-md md:mt-32 md:gap-8"
        >
          {socials.map(({ name, link, Icon }, idx) => (
            <li
              key={name}
              aria-label={name}
              title={name}
              role="listitem"
              data-aos="fade-left"
              data-aos-delay={`${idx * 50 + 200}`}
            >
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

      <section
        role="complementary"
        className="flex justify-start pt-10 md:justify-end"
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }} // parallax scroll
      >
        <div className="backdrop-blur sm:max-w-sm md:max-w-xs md:px-2">
          <h4
            data-aos="fade-left"
            className="tracking-[0.2em] text-textGray md:text-sm"
          >
            - Introduction
          </h4>
          <h2
            data-aos="fade-left"
            data-aos-delay="100"
            aria-label="about"
            className="mb-1 mt-3 text-xl font-semibold sm:mb-4 sm:text-3xl md:mb-10"
          >
            <Balancer>
              Web developer and product designer based in Nigeria.
            </Balancer>
          </h2>

          <p
            data-aos="fade-left"
            data-aos-delay="200"
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
