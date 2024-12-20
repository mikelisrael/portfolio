import { TypedObject } from "sanity";

type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

type sanityImage = {
  alt: string;
  caption?: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

type Slug = {
  current: string;
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
  slug: Slug;
  tools: ITool[];
  body: TypedObject[];
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
  resume: {
    title: string;
    file: {
      asset: {
        url: string;
      };
    };
  };
  projectsIntro: string;
  latestPosts: {
    slug: string;
    title: string;
    publishedAt: string;
  }[];
}

export interface IPost extends Base {
  title: string;
  slug: Slug;
  author: { name: string; image: sanityImage };
  mainImage: sanityImage;
  categories: { title: string; slug: Slug }[];
  publishedAt: string;
  body: TypedObject[];
  category: string[];
  plainText: string;
  estimatedReadingTime: number;
}

export type ProjectsData = {
  projectsIntro: string;
  projects: IProject[];
  resumeURL: string;
};
