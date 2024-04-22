"use client";

import { FaRegCopyright } from "react-icons/fa6";
import { socials } from "./socials";
import { useGlobalContext } from "../providers/context";

const Footer = () => {
  const { isFooterAndNavHidden } = useGlobalContext();

  if (isFooterAndNavHidden) return null;

  return (
    <footer>
      <div className="universal_x">
        <div className="text-gray-400 flex flex-wrap-reverse items-center justify-between gap-x-2 gap-y-5 py-5 md:py-10">
          <div className="flex gap-2">
            <span className="flex items-center gap-1">
              <FaRegCopyright className="text-xs" /> 2023
            </span>
            <span>Michael Israel.</span>
          </div>

          {/* icons */}
          <div className="flex items-center gap-3 text-lg">
            {socials.map((social, idx) => (
              <a
                key={idx}
                className="transition-colors duration-200 hover:text-primary"
                href={social.link}
              >
                {social.Icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
