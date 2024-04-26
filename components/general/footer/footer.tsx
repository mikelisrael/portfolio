import { IPageInfo, ISocial } from "@/types";
import { groq } from "next-sanity";
import FooterContent from "./footer-client";
import { sanityFetch } from "@/sanity/lib/onDemandFetch";

const query = groq`*[_type == "pageInfo"][0]{
  socials[]->,
  name
}`;

const Footer = async () => {
  const pageInfo: IPageInfo = await sanityFetch({
    query,
    tags: ["social"], // will revalidate for social changes
  });

  return (
    <footer>
      <FooterContent socials={pageInfo.socials} name={pageInfo.name} />
    </footer>
  );
};

export default Footer;
