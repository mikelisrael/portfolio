import React from "react";

export interface AppContextValue {
  headerInView: boolean;
  contactInView: boolean;
  projectTopInView: boolean;
  projectBottomInView: boolean;
  blogInView: boolean;
  headerRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  contactRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  projectTopRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  projectBottomRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  blogRef:
    | ((node?: Element | null | undefined) => void)
    | React.RefObject<HTMLDivElement>;
  isFooterAndNavHidden: boolean;
}
