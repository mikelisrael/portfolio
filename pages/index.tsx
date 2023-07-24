import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Services from "@/components/Services";
import React from "react";

const Home = () => {
  return (
    <Layout>
      <Header />
      <Contact />
      <Services />
    </Layout>
  );
};

export default Home;
