"use client";

import { AppContextValue } from "@/types";
import { usePathname } from "next/navigation";
import React, { ReactNode, useContext } from "react";
import { useInView } from "react-intersection-observer";

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.5,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.5,
  });
  const { ref: projectTopRef, inView: projectTopInView } = useInView({
    threshold: 0.5,
  });
  const { ref: projectBottomRef, inView: projectBottomInView } = useInView({
    threshold: 0.5,
  });
  const { ref: blogRef, inView: blogInView } = useInView({
    threshold: 0.5,
  });
  const pathname = usePathname();

  const hideAtLocations = ["/studio"];
  const isFooterAndNavHidden = hideAtLocations.some((target) =>
    pathname?.includes(target),
  );

  return (
    <AppContext.Provider
      value={{
        headerInView,
        contactInView,
        projectTopInView,
        projectBottomInView,
        blogInView,
        headerRef,
        contactRef,
        projectTopRef,
        projectBottomRef,
        blogRef,
        isFooterAndNavHidden,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useGlobalContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
