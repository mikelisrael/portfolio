"use client";

import React from "react";
import { MultiStepLoader as Loader } from "../shared/multi-step-loader";

interface LoadingProviderProps {
  children: React.ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Loader loading={loading} setLoading={setLoading} />
      {children}
    </>
  );
};

export default LoadingProvider;
