import { cn } from "@/lib/utils";
import { ISocial } from "@/types";
import Link from "next/link";
import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: { [key: string]: IconType } = {
  Discord: FaDiscord,
  Instagram: FaInstagram,
  X: FaXTwitter,
  Github: FaGithub,
};

function Socials({ socials }: { socials: ISocial[] }) {
  // Sort socials array based on preferred order
  const sortedSocials = socials.sort((a, b) => {
    if (a.name === "Github") return -1;
    if (b.name === "Github") return 1;
    if (a.name === "Discord") return -1;
    if (b.name === "Discord") return 1;
    if (a.name === "X") return -1;
    if (b.name === "X") return 1;
    return 0;
  });

  return (
    <>
      {sortedSocials.map(({ name, link }, idx) => {
        const Icon = iconMap[name];

        if (!Icon) return null;

        return (
          <li
            key={name}
            aria-label={name}
            title={name}
            role="listitem"
            style={{ animationDuration: `${(idx + 1) * 100 + 300}ms` }}
            className={cn(
              "duration-200 animate-in fade-in slide-in-from-right-32",
            )}
          >
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <TooltipProvider key={idx} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger aria-label={name} role="listitem">
                    <Icon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default Socials;
