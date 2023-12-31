import { FaRegCopyright } from "react-icons/fa6";
import { socials } from "./Header";

const Footer = () => {
  return (
    <footer className="bg-bgPrimary">
      {/* <hr className="border-gray-400 w-full border border-x-0 border-b-0" /> */}
      <div className="universal_x">
        <div className="text-gray-400 flex flex-wrap-reverse items-center justify-between gap-x-2 gap-y-5 py-5 md:py-10">
          <div className="flex gap-2">
            <span className="flex items-center gap-1">
              <FaRegCopyright className="text-xs" /> 2023
            </span>
            <span>Michael Israel.</span>
          </div>

          {/* <ul className="flex items-center gap-2  sm:gap-5">
            <li>
              <a href="" className="hover:text-yellowPrimary">
                Services
              </a>
            </li>
            <li>
              <a href="" className="hover:text-yellowPrimary">
                Projects
              </a>
            </li>
            <li>
              <a href="" className="hover:text-yellowPrimary">
                Blog
              </a>
            </li>
          </ul> */}

          {/* icons */}
          <div className="flex items-center gap-3 text-lg">
            {socials.map((social, idx) => (
              <a
                key={idx}
                className="transition-colors duration-200 hover:text-yellowPrimary"
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
