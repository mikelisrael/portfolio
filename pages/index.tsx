import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Stacks from "@/components/Stacks";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.5,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.5,
  });
  const { ref: projectRef, inView: projectInView } = useInView({
    threshold: 0.4,
  });
  const { ref: blogRef, inView: blogInView } = useInView({
    threshold: 0.5,
  });

  return (
    <Layout
      headerInView={headerInView}
      contactInView={contactInView}
      projectInView={projectInView}
      blogInView={blogInView}
    >
      <Header headerRef={headerRef} />
      <Contact contactRef={contactRef} />
      <Services />
      <Stacks />
      <Projects projectRef={projectRef} />
      <BlogSection blogRef={blogRef} />
    </Layout>
  );
};

export default Home;

export interface IProps {
  headerRef?: (node?: Element | null | undefined) => void;
  contactRef?: (node?: Element | null | undefined) => void;
  projectRef?: (node?: Element | null | undefined) => void;
  blogRef?: (node?: Element | null | undefined) => void;
  headerInView?: boolean;
  contactInView?: boolean;
  projectInView?: boolean;
  blogInView?: boolean;
}
//
