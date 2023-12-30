import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

// ============== classnames with tailwind merge and clsx ==============
export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
