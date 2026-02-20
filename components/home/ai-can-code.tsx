"use client";

import { AnimatedUpComponent } from "../shared/animated-components";
import PixelatedCanvas from "../shared/pixelated-canvas";

const AICanCode = () => {
  return (
    <AnimatedUpComponent
      as="section"
      className="mx-auto mt-20 flex max-w-4xl flex-col items-center justify-center gap-x-10 gap-y-10 px-6 md:flex-row"
    >
      <div className="hidden md:block">
        <PixelatedCanvas
          src="/img/robot.png"
          width={400}
          height={500}
          cellSize={3}
          dotScale={0.9}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0.4}
          interactive={true}
          distortionStrength={3}
          distortionRadius={80}
          distortionMode="swirl"
          followSpeed={0.2}
          jitterStrength={4}
          jitterSpeed={4}
          sampleAverage
          tintColor="blue"
          tintStrength={0.2}
          fadeOnLeave={true}
          fadeSpeed={0.1}
          className="rounded-xl border border-neutral-800 shadow-lg"
        />
      </div>

      <div>
        <h2 className="mb-4 font-serif text-xl capitalize sm:text-3xl md:mb-10">
          AI can code, but it is always gonna be garbage in, garbage out
        </h2>
        <p className="text-balance text-foreground-secondary">
          AI is fast, but it only mirrors patterns. It cannot feel a
          user&rsquo;s pain, judge what truly matters, or imagine what has never
          existed before. <br />
          <span className="text-foreground">
            Smart tools are great, but great products come from engineers who
            care.
          </span>
        </p>
      </div>
    </AnimatedUpComponent>
  );
};

export default AICanCode;
