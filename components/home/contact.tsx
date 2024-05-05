"use client";

import { IPageInfo } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { AnimatedUpComponent } from "../general/animated-components";
import ContactRef from "../general/section-refs/contact-ref";

const Contact: React.FC<IPageInfo> = ({
  yearsOfExperience,
  satisfiedClients,
  email,
  contactInfo,
  freeTalk,
  freeTalkHeading,
}) => {
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
    <ContactRef
      id="contact"
      className="scroll-m-20 bg-background-secondary pb-60 pt-20 md:pt-40"
    >
      <div className="universal_x grid gap-x-5 gap-y-16 md:grid-cols-2">
        <section
          role="region"
          aria-label="Contact Section"
          className="flex flex-col justify-between gap-y-10 md:min-h-[20rem]"
        >
          <div className="md:max-w-md">
            <AnimatedUpComponent>
              <h6 className="text-xs tracking-[0.2em] text-foreground-secondary md:text-sm">
                - Contact
              </h6>
            </AnimatedUpComponent>

            <AnimatedUpComponent>
              <h2 className="mb-4 mt-3 text-xl font-medium capitalize sm:text-3xl md:mb-10">
                any type of query & discussion
              </h2>
            </AnimatedUpComponent>

            <AnimatedUpComponent>
              <p className="text-balance text-foreground-secondary">
                {contactInfo}
              </p>
            </AnimatedUpComponent>
          </div>

          <AnimatedUpComponent>
            <Link
              aria-label="Email Address"
              aria-describedby="emailDescription"
              href={"mailto:" + email}
              className="group font-bold text-primary hover:underline"
            >
              <span>{email}</span>{" "}
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
              <h2 className="mb-4 text-xl font-medium capitalize sm:text-3xl md:mb-10">
                {freeTalkHeading}
              </h2>
            </AnimatedUpComponent>
            <AnimatedUpComponent>
              <p className="text-balance text-foreground-secondary">
                {freeTalk}
              </p>
            </AnimatedUpComponent>
          </div>

          {/* second element*/}
          <div className="flex gap-10 lg:gap-20">
            <AnimatedUpComponent>
              <div className="flex h-full items-end gap-3">
                <h4
                  className="text-5xl font-semibold text-primary lg:text-7xl"
                  ref={yearsRef}
                >
                  {yearsCounted ? <CountUp end={yearsOfExperience} /> : 0}
                </h4>
                <span>
                  Years of <br /> Experience.
                </span>
              </div>
            </AnimatedUpComponent>

            <AnimatedUpComponent delay={0.3}>
              <div className="flex h-full items-end gap-3">
                <h4
                  className="text-5xl font-semibold text-primary lg:text-7xl"
                  ref={clientsRef}
                >
                  {clientsCounted ? <CountUp end={satisfiedClients} /> : 0}
                </h4>
                <span>
                  Satisfied <br /> Clients.
                </span>
              </div>
            </AnimatedUpComponent>
          </div>
        </section>
      </div>
    </ContactRef>
  );
};

export default Contact;
