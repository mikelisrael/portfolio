"use client";

import { ScrollVelocity } from "@/components/ScrollVelocity";
import { urlForImage } from "@/sanity/lib/image";
import { ITool } from "@/types";
import Image from "next/image";

type Props = {
  tools: ITool[];
};

function TechnologiesClient({ tools }: Props) {
  const sorted = [...tools].sort((a, b) => a.priority - b.priority);

  const items = sorted.map((tool, idx) => (
    <div key={tool._id} className="flex flex-col items-center gap-2">
      <Image
        src={urlForImage(tool.toolImage)}
        alt={tool.name}
        width={48}
        height={48}
        loading={idx < 6 ? "eager" : "lazy"}
        priority={idx < 3}
        className="~size-10/12 object-contain"
      />
      <span className="text-xs text-foreground-secondary">{tool.name}</span>
    </div>
  ));

  return (
    <div className="~gap-3/6 flex w-full flex-col">
      <ScrollVelocity
        items={items}
        velocity={35}
        parallaxClassName="w-full py-4"
        numCopies={3}
      />
      <ScrollVelocity
        items={items}
        velocity={-35}
        parallaxClassName="w-full py-4"
        numCopies={3}
      />
    </div>
  );
}

export default TechnologiesClient;
