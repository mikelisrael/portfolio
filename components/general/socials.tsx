import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export type Social = {
  name: string;
  link: string;
  Icon: React.ReactNode;
};

export const socials: Social[] = [
  {
    name: "Github",
    link: "https://github.com/mikelisrael",
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
