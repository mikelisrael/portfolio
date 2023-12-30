import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
// import LazyLoader from "./LazyLoader";
import { Balancer } from "react-wrap-balancer";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Contact = () => {
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
    <div id="contact" className="bg-bgSecondary pb-60 pt-12 md:pb-72 md:pt-40">
      <div className="universal_x grid gap-x-5 gap-y-16 md:grid-cols-2">
        <section
          role="region"
          aria-label="Contact Section"
          className="flex flex-col justify-between gap-y-10 md:min-h-[20rem]"
        >
          <div className="md:max-w-md">
            <Balancer>
              <h4
                data-aos="fade-up"
                className="tracking-[0.2em] text-textGray md:text-sm"
              >
                - Contact
              </h4>
              <h2
                data-aos="fade-up"
                data-aos-delay="100"
                className="mb-1 mt-3 text-xl font-semibold capitalize sm:mb-4 sm:text-3xl md:mb-10"
              >
                any type of query & discussion
              </h2>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-textGray"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Possimus iure, numquam omnis excepturi, totam debitis
                dignissimos unde incidunt iste labore delectus a quod sunt
                vitae! Enim magni totam corporis quibusdam?
              </p>
            </Balancer>{" "}
          </div>

          {/* second element */}
          <a
            role="link"
            aria-label="Email Address"
            aria-describedby="emailDescription"
            data-aos="fade-up"
            href="mailto:israelipinkz@gmail.com"
            className="group font-bold text-yellowPrimary"
          >
            <span>{`israelipinkz@gmail.com`}</span>{" "}
            <FaArrowRight className="inline-block duration-200 group-hover:translate-x-3" />
          </a>
        </section>

        <section
          role="region"
          aria-label="Creative Section"
          className="flex flex-col items-start justify-between gap-y-10 md:min-h-[20rem]"
        >
          <div>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="mb-1 text-xl font-semibold sm:mb-4 sm:text-3xl md:mb-10"
            >
              You {`can't`} use up creativity, the more you use, more you have
              in your significant mind
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-textGray"
            >
              <Balancer>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Possimus iure, numquam omnis excepturi, totam debitis
                dignissimos unde incidunt iste labore delectus a quod sunt
                vitae! Enim magni totam corporis quibusdam?
              </Balancer>
            </p>
          </div>

          {/* second element*/}
          <div data-aos="fade-up" className="flex gap-10 lg:gap-20">
            <div className="flex items-end gap-3">
              <h4
                className="text-5xl font-semibold text-yellowPrimary lg:text-7xl"
                ref={yearsRef}
                aria-level={2}
                aria-live="polite"
              >
                {yearsCounted ? <CountUp end={10} /> : 0}
              </h4>
              <span>
                Years of <br /> Experience.
              </span>
            </div>

            <div className="flex items-end gap-3">
              <h4
                className="text-5xl font-semibold text-yellowPrimary lg:text-7xl"
                ref={clientsRef}
                aria-level={2}
                aria-live="polite"
              >
                {clientsCounted ? <CountUp end={147} /> : 0}
              </h4>
              <span>
                Satisfied <br /> Clients.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;

// usage of LazyLoader
{
  /* <div className="h-[30rem]">
  <LazyLoader
    hash="LXI{~GoMoMxt~VNdoft7o#oet7oy"
    src="/img/jj.jpg"
    className="w-full"
  />
</div>; */
}
