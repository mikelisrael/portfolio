import React from "react";
import { AnimatedUpComponent } from "../shared/animated-components";
import Image from "next/image";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-7 py-20 md:gap-10">
      <AnimatedUpComponent className="relative size-14 md:size-20">
        <Image src="/logo.png" alt="logo" fill />
      </AnimatedUpComponent>
      <AnimatedUpComponent as="p">
        <span className="font-black">Thanks for scrolling. </span>
        That&rsquo;s all folks!
      </AnimatedUpComponent>
    </div>
  );
};

export default ThankYou;
