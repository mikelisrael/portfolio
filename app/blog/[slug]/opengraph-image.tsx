import OpenGraphImageComponent from "@/components/general/opengraph-image-comp";
import { client } from "@/sanity/lib/client";
import { IPost } from "@/types";
import { groq } from "next-sanity";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Blog post image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const titleQuery = groq`*[_type == "post" && slug.current == $slug][0]{title}`;
  const res: IPost = await client.fetch(titleQuery, { slug });

  // Font
  //   const interSemiBold = fetch(
  //     new URL("./Inter-SemiBold.ttf", import.meta.url),
  //   ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "2.5rem",
        }}
      >
        {res.title}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      //   fonts: [
      //     {
      //       name: "Inter",
      //       data: await interSemiBold,
      //       style: "normal",
      //       weight: 400,
      //     },
      //   ],
    },
  );
}