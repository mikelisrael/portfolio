import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/onDemandFetch";
import { ITool } from "@/types";
import { groq } from "next-sanity";
import { AnimatedUpComponent } from "../general/animated-components";

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
        <div className="grid grid-cols-2 flex-wrap items-center justify-center gap-x-10 gap-y-10 sm:gap-x-20 md:flex">
          {tools
            .sort((a, b) => a.priority - b.priority)
            .map((tool, idx) => (
              <AnimatedUpComponent
                className="flex items-center gap-2"
                key={idx}
              >
                <img
                  src={urlForImage(tool.toolImage)}
                  alt={tool.name}
                  className="size-10 object-contain md:size-12"
                />
                <span className="mt-2">{tool.name}</span>
              </AnimatedUpComponent>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
