"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

type OmitOnLoad = Omit<ImageProps, "onLoad">;

const BlurImage = ({ className, ...props }: OmitOnLoad) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Image
      {...props}
      onLoad={() => setLoaded(true)}
      className={cn(className, loaded ? "blur-none" : "blur-md")}
    />
  );
};

export default BlurImage;
