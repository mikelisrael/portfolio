import { getDate } from "@/lib/utils";
import { IPost } from "@/types";
import HeaderRef from "../shared/section-refs/header-ref";

const Header = ({ posts }: { posts: IPost[] }) => {
  return (
    <HeaderRef className="relative">
      <h2
        aria-label="blog header"
        className="mb-1 w-full text-3xl font-semibold duration-500 animate-in fade-in slide-in-from-right-48 sm:text-5xl"
      >
        Stories
      </h2>

      <p className="space-x-2 text-foreground-secondary duration-700 animate-in fade-in slide-in-from-right-48 ">
        <span>{getDate()}</span>
        <span className="text-lg text-primary">•</span>
        <span>{posts.length} Stories</span>
      </p>
    </HeaderRef>
  );
};

export default Header;
