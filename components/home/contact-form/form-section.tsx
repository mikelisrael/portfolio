"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { AnimatedUpComponent } from "../../general/animated-components";
import ContactForm from ".";

const FormSection = ({ email, cta }: { email: string; cta: string }) => {
  return (
    <section className="universal_x grid gap-x-10 gap-y-10 py-20 md:grid-cols-[40%,1fr] md:py-40 lg:gap-x-28">
      <div>
        <AnimatedUpComponent delay={0.1}>
          <h2
            aria-label="about"
            className="mb-4 text-balance text-xl font-semibold sm:text-3xl md:mb-7"
          >
            Got a project? <br /> Let&rsquo;s Talk.
          </h2>
        </AnimatedUpComponent>

        <AnimatedUpComponent>
          <p className="text-foreground-secondary">{cta}</p>
        </AnimatedUpComponent>

        <AnimatedUpComponent className="mt-10 md:mt-16">
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
      </div>

      <div>
        <AnimatedUpComponent delay={0.1}>
          <h2
            aria-label="about"
            className="mb-10 text-balance text-xl font-semibold sm:text-3xl"
          >
            Fill in the details below. <br /> Let&rsquo;s get the ball rolling.
          </h2>
        </AnimatedUpComponent>

        <ContactForm />
      </div>
    </section>
  );
};

export default FormSection;
