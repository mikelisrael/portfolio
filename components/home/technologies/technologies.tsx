import { sanityFetch } from "@/sanity/lib/onDemandFetch";
import { ITool } from "@/types";
import { groq } from "next-sanity";
import { AnimatedUpComponent } from "../../general/animated-components";
import TechnologiesClient from "./technologies-client";

const query = groq`*[_type == "tool"]`;

const Technologies = async () => {
  const tools: ITool[] = await sanityFetch({
    query,
    tags: ["tool"], // will revalidate for tool changes
  });

  return (
    <section className="universal_x -mt-10 md:mt-0 md:pt-10">
      <AnimatedUpComponent>
        <h6 className="mb-7 text-xs tracking-[0.2em] text-foreground-secondary md:hidden md:text-sm">
          - Tools & Technologies
        </h6>
      </AnimatedUpComponent>

      <div className="flex items-center justify-center">
        <TechnologiesClient tools={tools} />
      </div>
    </section>
  );
};

export default Technologies;
