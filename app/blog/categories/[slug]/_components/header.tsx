import HeaderRef from "@/components/shared/section-refs/header-ref";
import { getDate } from "@/lib/utils";
import { IPost } from "@/types";

const Header = ({
  posts,
  title,
}: {
  posts: IPost[];
  title: { title: string };
}) => {
  return (
    <HeaderRef className="relative w-full">
      <h2
        aria-label="blog header"
        className="mb-1 w-full text-3xl font-semibold duration-500 animate-in fade-in slide-in-from-right-48 sm:text-5xl"
      >
        {title.title}
      </h2>

      <p className="space-x-2 text-foreground-secondary duration-700 animate-in fade-in slide-in-from-right-48 ">
        <span>{getDate()}</span>
        <span className="text-lg text-primary">•</span>
        <span>

        {posts.length} {posts.length === 1 ? "story" : "stories"}
        </span>
      </p>
    </HeaderRef>
  );
};

export default Header;
