import { IProps } from "@/pages";
import Balancer from "react-wrap-balancer";
import ProjectCard, { IProject } from "./ProjectCard";

const Projects: React.FC<IProps> = ({ projectRef }) => {
  const projects: IProject[] = [
    {
      name: "Esque bot",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, deserunt?!",
      image: "https://www.trulyao.dev/projects/plunk.png",
      github: "",
      link: "godummy",
    },
    {
      name: "Project X",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://www.trulyao.dev/projects/phprouter.png",
      github: "",
      isPrivate: true,
    },
    {
      name: "Project Y",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "https://www.trulyao.dev/projects/phlo.png",
      github: "",
      isPrivate: true,
      link: "https://www.trulyao.dev",
    },
    {
      name: "Project Z",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://www.trulyao.dev/projects/plunk.png",
      github: "",
      isPrivate: true,
    },
    {
      name: "Project X",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://www.trulyao.dev/projects/phprouter.png",
      github: "",
      isPrivate: true,
    },
    {
      name: "Project Y",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "https://www.trulyao.dev/projects/phlo.png",
      github: "",
      isPrivate: true,
      link: "https://www.trulyao.dev",
    },
    {
      name: "Project X",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://www.trulyao.dev/projects/phprouter.png",
      github: "",
      isPrivate: true,
    },
    {
      name: "Project Y",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image: "https://www.trulyao.dev/projects/phlo.png",
      github: "",
      isPrivate: true,
      link: "https://www.trulyao.dev",
    },
    {
      name: "Project Z",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://www.trulyao.dev/projects/plunk.png",
      github: "",
      isPrivate: true,
    },
  ];

  return (
    <section
      ref={projectRef}
      id="projects"
      className="universal_x my-20 pb-10 pt-20 md:my-32 md:py-32"
    >
      <h4
        data-aos="fade-left"
        className="tracking-[0.2em] text-textGray md:text-sm"
      >
        - Portfolio
      </h4>
      <h2
        data-aos="fade-left"
        data-aos-delay="100"
        aria-label="about"
        className="mb-10 mt-3 text-xl font-semibold sm:text-3xl md:mb-16"
      >
        <Balancer>All creative works, selected projects</Balancer>
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
