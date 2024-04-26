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

type sanityImage = {
  alt: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export interface IProject {
  name: string;
  subtitle: string;
  description: string;
  image: sanityImage;
  github?: string;
  link?: string;
  isPrivate?: boolean;
  priority: number;
}

export interface ITool extends Base {
  name: string;
  toolImage: sanityImage;
  priority: number;
}

export interface ISocial extends Base {
  name: string;
  link: string;
}

export interface ITestimonials extends Base {
  name: string;
  quote: string;
  position: string;
  photo: sanityImage;
}

export interface IPageInfo extends Base {
  name: string;
  introductionHeading: string;
  introduction: string;
  subjectImage: sanityImage;
  socials: ISocial[];
  yearsOfExperience: number;
  satisfiedClients: number;
  email: string;
  contactInfo: string;
  freeTalkHeading: string;
  freeTalk: string;
  projectInvitationHeading: string;
  projectInvitation: string;
  testimonials: ITestimonials[];
  cta: string;
  projects: IProject[];
}
