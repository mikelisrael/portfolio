import { client } from "@/sanity/lib/client";
import { ISocial } from "@/types";
import { groq } from "next-sanity";
import FooterContent from "./footer-client";

const Footer = async () => {
  const query = groq`*[_type == "social"]`;
  const socials: ISocial[] = await client.fetch(query);

  return (
    <footer>
      <FooterContent socials={socials} />
    </footer>
  );
};

export default Footer;
