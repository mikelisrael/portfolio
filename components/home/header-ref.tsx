"use client";

import React from "react";
import { useGlobalContext } from "../providers/context";

const HeaderRef = () => {
  const { headerRef } = useGlobalContext();

  return <div ref={headerRef}></div>;
};

export default HeaderRef;
