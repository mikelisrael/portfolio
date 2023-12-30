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

  return (
    <Layout headerInView={headerInView}>
      <Header headerRef={headerRef} />
      <Contact />
      <Services />
      <Stacks />
      <Projects />
      <BlogSection />
    </Layout>
  );
};

export default Home;

export interface IProps {
  headerRef?: (node?: Element | null | undefined) => void;
  headerInView?: boolean;
}
