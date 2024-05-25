"use client";

import { AnimatedUpComponent } from "@/components/shared/animated-components";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type Props = {
  yearsOfExperience: number;
  satisfiedClients: number;
};

function YearsAndClients({ yearsOfExperience, satisfiedClients }: Props) {
  const { ref: yearsRef, inView: yearsInView } = useInView({
    threshold: 0.5,
  });
  const { ref: clientsRef, inView: clientsInView } = useInView({
    threshold: 0.5,
  });
  const [yearsCounted, setYearsCounted] = useState(false);
  const [clientsCounted, setClientsCounted] = useState(false);

  useEffect(() => {
    if (yearsInView && !yearsCounted) {
      setYearsCounted(true);
    }

    if (clientsInView && !clientsCounted) {
      setClientsCounted(true);
    }
  }, [yearsInView, yearsCounted, clientsInView, clientsCounted]);

  return (
    <div className="flex gap-10 lg:gap-20">
      <AnimatedUpComponent className="flex h-full items-end gap-3">
        <h4
          className="text-5xl font-semibold text-primary lg:text-7xl"
          ref={yearsRef}
        >
          {yearsCounted ? <CountUp end={yearsOfExperience} /> : 0}
        </h4>
        <span>
          Years of <br /> Experience.
        </span>
      </AnimatedUpComponent>

      <AnimatedUpComponent delay={0.3} className="flex h-full items-end gap-3">
        <h4
          className="text-5xl font-semibold text-primary lg:text-7xl"
          ref={clientsRef}
        >
          {clientsCounted ? <CountUp end={satisfiedClients} /> : 0}
        </h4>
        <span>
          Satisfied <br /> Clients.
        </span>
      </AnimatedUpComponent>
    </div>
  );
}

export default YearsAndClients;
