import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { IProps } from "@/pages";

interface ILayoutProps extends IProps {
  children: ReactNode;
  headerInView?: boolean;
}

const Layout = ({ children, headerInView }: ILayoutProps) => {
  return (
    <>
      <Navbar headerInView={headerInView} />

      {children}
    </>
  );
};

export default Layout;
