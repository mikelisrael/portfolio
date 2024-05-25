"use client";

import BlurImage from "@/components/shared/blur-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer, CardItem } from "./3d-card-component";

export function ThreeDCard() {
  const router = useRouter();

  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-border p-6 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]  ">
        <CardItem translateZ="50" className="text-5xl font-bold text-white">
          Oops!
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-4 max-w-sm space-y-2 text-sm text-neutral-300"
        >
          I&rsquo;m afraid you have found a page that doesn&rsquo;t exist on my
          website. That can happen when you follow a link to a deleted page or
          if the link was mistyped.
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <BlurImage
            src="/img/404.png"
            height="1000"
            width="1000"
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem translateZ="60" as="p" className="mt-4">
          Sorry about that. Take a deep breath and...
        </CardItem>
        <div className="mt-10 flex items-center justify-between">
          <CardItem
            translateZ={20}
            as={Link}
            href="/projects"
            className="rounded-xl px-4 py-2 text-xs font-normal text-white"
            onClick={() => router.push("/projects")}
          >
            Projects →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black"
            onClick={() => router.push("/")}
          >
            Go back to homepage
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
