"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { AnimatedUpComponent } from "../../shared/animated-components";
import ContactForm from ".";

const FormSection = ({ email, cta }: { email: string; cta: string }) => {
  return (
    <section className="universal_x grid gap-x-10 gap-y-10 py-20 md:grid-cols-[40%,1fr] md:py-40 lg:gap-x-28">
      <div>
        <AnimatedUpComponent
          as="h2"
          delay={0.1}
          className="mb-4 text-balance text-xl font-semibold sm:text-3xl md:mb-7"
        >
          Got a project? <br /> Let&rsquo;s Talk.
        </AnimatedUpComponent>

        <AnimatedUpComponent as="p" className="text-foreground-secondary">
          {cta}
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
        <AnimatedUpComponent
          as="h2"
          delay={0.1}
          className="mb-10 text-balance text-xl font-semibold sm:text-3xl"
        >
          Fill in the details below. <br /> Let&rsquo;s get the ball rolling.
        </AnimatedUpComponent>

        <ContactForm />
      </div>
    </section>
  );
};

export default FormSection;
