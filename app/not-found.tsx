import HeaderRef from "@/components/shared/section-refs/header-ref";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="universal_x py-20">
      <div className="max-w-md">
        <HeaderRef>
          <h1 id="404Page" className="w-full text-7xl font-bold">
            404.
          </h1>
        </HeaderRef>

        <div className="space-y-4 py-10 text-foreground-secondary">
          {" "}
          <p>
            I&rsquo;m afraid you have found a page that doesn&rsquo;t exist on
            my website. That can happen when you follow a link to a deleted page
            or if the link was mistyped.
          </p>
          <p>Sorry about that. Take a deep breath and...</p>
        </div>

        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Go back to homepage
        </Link>

        <p className="mt-10 text-xs text-foreground-secondary/30">
          PS, can&rsquo;t think of a more creative 404 at the moment. I&rsquo;ll
          work on it.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
