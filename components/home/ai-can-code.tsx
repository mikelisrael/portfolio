import { AnimatedUpComponent } from "../shared/animated-components";
import { EvervaultCard } from "../shared/evervault-card";

const AICanCode = () => {
  return (
    <AnimatedUpComponent
      as="section"
      className="mx-auto mt-20 flex max-w-4xl flex-col items-center justify-center gap-x-10 gap-y-10 px-6 md:flex-row"
    >
      <EvervaultCard
        text="Hover Me"
        imageUrl="/img/robot.png"
        className="aspect-[4/5] w-full"
      />

      <div>
        <h2 className="mb-4 text-xl font-medium capitalize sm:text-3xl md:mb-10">
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
