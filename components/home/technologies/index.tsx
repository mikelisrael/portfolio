import { sanityFetch } from "@/sanity/lib/fetch";
import { ITool } from "@/types";
import { groq } from "next-sanity";
import TechnologiesClient from "./technologies-client";

const query = groq`*[_type == "tool"]`;

const Technologies = async () => {
  const tools: ITool[] = await sanityFetch({
    query,
    tags: ["tool"],
  });

  return (
    <section className="-mt-10 md:mt-0 md:pt-5">
      <TechnologiesClient tools={tools} />
    </section>
  );
};

export default Technologies;
