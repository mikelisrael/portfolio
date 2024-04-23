import React from "react";

type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

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

export interface IProject {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  github: string;
  link?: string;
  isPrivate?: boolean;
}

export interface ISocial extends Base {
  name: string;
  link: string;
}

export interface IPageInfo extends Base {
  name: string;
  introductionHeading: string;
  introduction: string;
  subjectImage: {
    alt: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  socials: ISocial[];
  yearsOfExperience: number;
  satisfiedClients: number;
  email: string;
  contactInfo: string;
  freeTalkHeading: string;
  freeTalk: string;
}
