import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
} from "motion/react";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  items: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface VelocityTrackProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);
    setWidth(ref.current.offsetWidth);

    return () => observer.disconnect();
  }, [ref]);

  return width;
}

function VelocityTrack({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = "",
  damping,
  stiffness,
  numCopies = 4,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}: VelocityTrackProps) {
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const directionFactor = useRef<number>(1);

  // Pause RAF when off-screen
  const isInView = useInView(trackRef, { margin: "200px" });

  // Pause when tab is hidden
  const isTabVisible = useRef(true);
  useEffect(() => {
    const handleVisibility = () => {
      isTabVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input ?? [0, 1000],
    velocityMapping?.output ?? [0, 5],
    { clamp: false },
  );

  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  useAnimationFrame((_, delta) => {
    // Skip frames when off-screen or tab hidden
    if (!isInView || !isTabVisible.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const copies = Array.from({ length: numCopies }, (_, i) => (
    <div
      key={i}
      ref={i === 0 ? copyRef : null}
      className={`flex flex-shrink-0 items-center gap-8 ${className}`}
      // Prevent layout thrash — each copy is inert to pointer
      aria-hidden={i !== 0 ? true : undefined}
    >
      {children}
    </div>
  ));

  return (
    <div
      ref={trackRef}
      className={`${parallaxClassName ?? ""} relative overflow-hidden`}
      style={parallaxStyle}
    >
      <motion.div
        className={`${scrollerClassName ?? ""} flex whitespace-nowrap`}
        style={{
          x,
          willChange: "transform",
          ...scrollerStyle,
        }}
      >
        {copies}
      </motion.div>
    </div>
  );
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  items = [],
  velocity = 100,
  className,
  damping,
  stiffness,
  numCopies,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  return (
    <section>
      <VelocityTrack
        baseVelocity={velocity}
        scrollContainerRef={scrollContainerRef}
        className={className}
        damping={damping}
        stiffness={stiffness}
        numCopies={numCopies}
        velocityMapping={velocityMapping}
        parallaxClassName={parallaxClassName}
        scrollerClassName={scrollerClassName}
        parallaxStyle={parallaxStyle}
        scrollerStyle={scrollerStyle}
      >
        {items}
      </VelocityTrack>
    </section>
  );
};

export default ScrollVelocity;
