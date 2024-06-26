"use client";

import { ISocial } from "@/types";
import { FaRegCopyright } from "react-icons/fa6";
import { useGlobalContext } from "@/components/providers/context";
import Socials from "../socials";

type Props = {
  socials: ISocial[];
  name: string;
};

function FooterContent({ socials, name }: Props) {
  const { isFooterAndNavHidden } = useGlobalContext();

  function currentYear() {
    return new Date().getFullYear();
  }

  if (isFooterAndNavHidden) return null;

  return (
    <div className="universal_x">
      <div className="text-gray-400 flex flex-wrap-reverse items-center justify-between gap-x-2 gap-y-5 py-5 md:py-10">
        <div className="flex gap-2 text-xs md:text-sm">
          <span className="flex items-center gap-1">
            <FaRegCopyright className="text-xs" /> {currentYear()}
          </span>
          <span>{name}.</span>
        </div>

        {/* icons */}
        <ul className="flex items-center gap-3 text-lg">
          <Socials socials={socials} />
        </ul>
      </div>
    </div>
  );
}

export default FooterContent;
