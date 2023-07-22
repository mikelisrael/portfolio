import React from "react";
import Balancer from "react-wrap-balancer";

const Header = () => {
  return (
    <header className="universal_x flex">
      <section className="flex-1">
        <h1 className="text-9xl font-black pt-16">
          Israel <span className="block -translate-y-6">Michael.</span>
        </h1>
      </section>

      <section className="pt-16">
        <h4 className="tracking-[0.2em] text-sm text-textGray">
          - Introduction
        </h4>
        <Balancer>
          <h2 className="text-3xl mt-3 mb-10 font-semibold">
            Web developer and product designer based in Nigeria.
          </h2>

          <p className="text-textGray">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            iure, numquam omnis excepturi, totam debitis dignissimos unde
            incidunt iste labore delectus a quod sunt vitae! Enim magni totam
            corporis quibusdam?
          </p>
        </Balancer>
      </section>
    </header>
  );
};

export default Header;
