"use client";

import { AnimatedUpComponent } from "@/components/shared/animated-components";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type Props = {
  satisfiedClients: number;
};

function YearsAndClients({ satisfiedClients }: Props) {
  const { ref: yearsRef, inView: yearsInView } = useInView({
    threshold: 0.5,
  });
  const { ref: clientsRef, inView: clientsInView } = useInView({
    threshold: 0.5,
  });
  const [yearsCounted, setYearsCounted] = useState(false);
  const [clientsCounted, setClientsCounted] = useState(false);

  const yearsCalculator = () => {
    const startDate = new Date(2018, 7, 1);
    const now = new Date();
    const years =
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  };

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
          className="space-x-1 align-super text-5xl font-semibold text-primary lg:text-7xl"
          ref={yearsRef}
        >
          {yearsCounted ? (
            <>
              <CountUp end={yearsCalculator()} />
              <sup className="text-4xl">+</sup>
            </>
          ) : (
            0
          )}
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
