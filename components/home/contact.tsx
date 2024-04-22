"use client";

import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import CountUp from "react-countup";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { AnimatedUpComponent } from "../general/animated-components";
import { useGlobalContext } from "../providers/context";

const Contact = () => {
  const { contactRef } = useGlobalContext();
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
    <div
      ref={contactRef}
      id="contact"
      className="scroll-m-20 bg-secondary-background py-20 md:py-40"
    >
      <div className="universal_x grid gap-x-5 gap-y-16 md:grid-cols-2">
        <section
          role="region"
          aria-label="Contact Section"
          className="flex flex-col justify-between gap-y-10 md:min-h-[20rem]"
        >
          <div className="md:max-w-md">
            <AnimatedUpComponent>
              <h6 className="text-xs tracking-[0.2em] text-textGray md:text-sm">
                - Contact
              </h6>
            </AnimatedUpComponent>

            <AnimatedUpComponent>
              <h2 className="mb-4 mt-3 text-xl font-medium capitalize sm:text-3xl md:mb-10">
                any type of query & discussion
              </h2>
            </AnimatedUpComponent>

            <AnimatedUpComponent>
              <p className="text-balance text-textGray">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Possimus iure, numquam omnis excepturi, totam debitis
                dignissimos unde incidunt iste labore delectus a quod sunt
                vitae! Enim magni totam corporis quibusdam?
              </p>
            </AnimatedUpComponent>
          </div>

          <AnimatedUpComponent>
            <Link
              aria-label="Email Address"
              aria-describedby="emailDescription"
              href="mailto:israelipinkz@gmail.com"
              className="group font-bold text-primary"
            >
              <span>{`israelipinkz@gmail.com`}</span>{" "}
              <FaArrowRight className="inline-block duration-200 group-hover:translate-x-3" />
            </Link>
          </AnimatedUpComponent>
        </section>

        <section
          role="region"
          aria-label="Creative Section"
          className="flex flex-col items-start justify-between gap-y-10 md:min-h-[20rem]"
        >
          <div>
            <AnimatedUpComponent>
              <h2 className="mb-4 text-xl font-medium sm:text-3xl md:mb-10">
                You {`can't`} use up creativity, the more you use, more you have
                in your significant mind
              </h2>
            </AnimatedUpComponent>
            <AnimatedUpComponent>
              <p className="text-balance text-textGray">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Possimus iure, numquam omnis excepturi, totam debitis
                dignissimos unde incidunt iste labore delectus a quod sunt
                vitae! Enim magni totam corporis quibusdam?
              </p>
            </AnimatedUpComponent>{" "}
          </div>

          {/* second element*/}
          <AnimatedUpComponent>
            <div className="flex gap-10 lg:gap-20">
              <div className="flex items-end gap-3">
                <h4
                  className="text-5xl font-semibold text-primary lg:text-7xl"
                  ref={yearsRef}
                >
                  {yearsCounted ? <CountUp end={6} /> : 0}
                </h4>
                <span>
                  Years of <br /> Experience.
                </span>
              </div>

              <div className="flex items-end gap-3">
                <h4
                  className="text-5xl font-semibold text-primary lg:text-7xl"
                  ref={clientsRef}
                >
                  {clientsCounted ? <CountUp end={26} /> : 0}
                </h4>
                <span>
                  Satisfied <br /> Clients.
                </span>
              </div>
            </div>
          </AnimatedUpComponent>
        </section>
      </div>
    </div>
  );
};

export default Contact;
