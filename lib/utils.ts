import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const emailJSConfig = {
  serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY,
};

export const trimData = (data: any) => {
  const trimmedData = Object.keys(data).reduce((acc, key) => {
    return { ...acc, [key]: data[key].trim() };
  }, {});

  return trimmedData;
};

export const getDate = (date: string | undefined) => {
  return moment(date).format("Do MMMM, YYYY");
};
