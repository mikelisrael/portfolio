import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Balancer } from "react-wrap-balancer";

const Contact = () => {
  return (
    <div id="contact" className="bg-bgSecondary pt-12 pb-60 md:pt-40 md:pb-72">
      <div className="universal_x grid gap-x-5 gap-y-16 md:grid-cols-2">
        <section className="flex flex-col gap-y-10 md:min-h-[20rem] justify-between">
          <div className="md:max-w-md">
            <Balancer>
              <h4
                data-aos="fade-up"
                className="tracking-[0.2em] md:text-sm text-textGray"
              >
                - Contact
              </h4>
              <h2
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-2xl sm:text-3xl mt-3 mb-7 md:mb-10 font-semibold capitalize"
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
            data-aos="fade-up"
            href="mailto:israelipnkz@gmail.com"
            className="text-yellowPrimary group"
          >
            <span>{`israelipinkz@gmail.com`}</span>{" "}
            <FaArrowRight className="inline-block group-hover:translate-x-3 duration-100" />
          </a>
        </section>

        <section className="flex flex-col gap-y-10 md:min-h-[20rem] items-start justify-between">
          <div>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-2xl sm:text-3xl mb-7 md:mb-10 font-semibold"
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
            <div className="flex gap-3 items-end">
              <h4 className="text-yellowPrimary text-5xl lg:text-7xl font-semibold">
                14
              </h4>
              <span>
                Years of <br /> Experience.
              </span>
            </div>

            <div className="flex gap-3 items-end">
              <h4 className="text-yellowPrimary text-5xl lg:text-7xl font-semibold">
                187
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
