import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const StudioNavbar = (props: any) => {
  return (
    <div>
      <div className="border-b border-white/20 bg-background-secondary p-3 py-1">
        <Button className="gap-1 p-0 text-sm" variant="link" asChild>
          <Link href="/">
            <RiArrowGoBackFill className="size-4" />
            Go to website
          </Link>
        </Button>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;
