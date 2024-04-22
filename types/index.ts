import React from "react";

export interface AppContextValue {
  headerInView: boolean;
  contactInView: boolean;
  projectInView: boolean;
  blogInView: boolean;
  headerRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  contactRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  projectRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  blogRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  isFooterAndNavHidden: boolean;
}

export interface IProject {
  name: string;
  description: string;
  image: string;
  github: string;
  link?: string;
  isPrivate?: boolean;
}
