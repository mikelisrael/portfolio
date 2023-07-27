import React, { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { FaGithub, FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import styles from "@/styles/Animations.module.css";
import { IProps } from "@/pages";

type Social = {
  name: string;
  link: string;
  Icon: React.ReactNode;
};

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
      ref={headerRef}
      role="banner"
      className="universal_x relative grid md:grid-cols-2 py-10 isolate"
    >
      {/* image */}
      <div
        role="img"
        className="absolute -scale-x-100 md:scale-x-100 overflow-hidden bottom-0 -z-10 -right-64 md:right-auto left-auto md:left-[15%] lg:left-[20%] w-[32rem] xl:w-[36rem]"
        onContextMenu={(e) => e.preventDefault()} // prevent right click
      >
        <Image
          priority
          width={1000}
          height={1000}
          src="/img/israel3.png"
          className={styles.fadeInBottomLeft + " w-full"}
          alt="Michael Israel"
          aria-label="Michael Israel"
        />
      </div>

      <section
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }} //parallax scroll
      >
        <div className="relative">
          <h1
            data-aos="fade-left"
            role="heading"
            aria-level={1}
            className="relative text-7xl lg:text-8xl xl:text-9xl font-black md:pt-10"
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
            className="absolute content-[''] -bottom-4 bg-yellowPrimary h-2 lg:h-4 w-[15%] md:w-[20%]"
          ></div>
        </div>

        {/* icons */}
        <ul
          role="list"
          aria-label="social media links"
          className="mt-16 md:mt-32 text-xl flex gap-5 md:gap-8 backdrop-blur-md w-max pr-2"
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
        className="pt-10 flex justify-start md:justify-end"
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)` }} // parallax scroll
      >
        <div className="sm:max-w-sm md:max-w-xs backdrop-blur md:px-2">
          <h4
            data-aos="fade-left"
            className="tracking-[0.2em] md:text-sm text-textGray"
          >
            - Introduction
          </h4>
          <h2
            data-aos="fade-left"
            data-aos-delay="100"
            aria-label="about"
            className="text-xl sm:text-3xl mt-3 mb-1 sm:mb-4 md:mb-10 font-semibold"
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
