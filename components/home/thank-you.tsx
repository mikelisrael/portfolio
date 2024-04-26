import React from "react";
import { AnimatedUpComponent } from "../general/animated-components";

const ThankYou = () => {
  return (
    <div className="py-20">
      <AnimatedUpComponent>
        <p className="text-center">
          <span className="font-black">Thanks for scrolling. </span>
          That's all folks!
        </p>
      </AnimatedUpComponent>
    </div>
  );
};

export default ThankYou;
