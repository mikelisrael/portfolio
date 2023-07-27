import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

type ImageProps = React.ComponentProps<"img">;

interface LazyLoaderProps extends ImageProps {
  hash: string;
}

const LazyLoader = (props: LazyLoaderProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = props.src as string;
    img.onload = () => setIsImageLoaded(true);
  }, [props.src]);

  const transitionStyle = {
    transition: "opacity 1s ease-in-out",
    opacity: isImageLoaded ? 1 : 0,
  };

  return (
    <div className="relative h-full" style={{ ...transitionStyle }}>
      <Blurhash
        hash={props.hash}
        width="100%"
        height="100%"
        resolutionX={32}
        resolutionY={32}
        punch={1}
        className="animate-pulse"
      />
      <img
        {...props}
        className={`w-full h-full absolute inset-0 fade_in object-cover opacity-${
          isImageLoaded
            ? "100"
            : "0 transition-opacity duration-1000 ease-in-out"
        }`}
        alt={props.alt}
      />
    </div>
  );
};

export default LazyLoader;
