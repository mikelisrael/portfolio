import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Services from "@/components/Services";
import { useInView } from "react-intersection-observer";
import React from "react";
import Stacks from "@/components/Stacks";

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
    </Layout>
  );
};

export default Home;

export interface IProps {
  headerRef?: (node?: Element | null | undefined) => void;
  headerInView?: boolean;
}
