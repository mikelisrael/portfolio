import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { IProps } from "@/pages";
import Footer from "./Footer";

interface ILayoutProps extends IProps {
  children: ReactNode;
  headerInView?: boolean;
}

const Layout = ({
  children,
  headerInView,
  contactInView,
  projectInView,
  blogInView
}: ILayoutProps) => {
  return (
    <>
      <Navbar
        headerInView={headerInView}
        contactInView={contactInView}
        projectInView={projectInView}
        blogInView={blogInView}
      />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
