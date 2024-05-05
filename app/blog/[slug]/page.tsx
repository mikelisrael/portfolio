import GoBackButton from "@/components/blog/go-back-button";
import ImportPreviewBlog from "@/components/blog/import-preview-Blog";
import SingleBlogPost from "@/components/blog/single-blog-post";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { IPost } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

// get query params
export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug)][].slug.current`;
  const slugs = await client.fetch<string[]>(query);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const titleQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    title, 'plainText': pt::text(body), mainImage
    }`;
  const res: IPost = await client.fetch(titleQuery, { slug });
  const description = `${res.plainText.slice(0, 100)}...`;
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const currentImage = urlForImage(res.mainImage) || "";

  return {
    title: res.title,
    description,
    openGraph: {
      images: [
        {
          type: "image/png",
          width: 1200,
          height: 630,
          url: currentImage,
        },
        ...previousImages,
      ],
      description,
    },
  };
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  categories[]->,
  author->,
   'estimatedReadingTime': round(length(pt::text(body)) / 5 / 180 )
}`;

const BlogPost = async ({ params: { slug } }: Props) => {
  const data: IPost = await sanityFetch<IPost>({
    query,
    params: { slug },
    tags: ["post"],
  });

  if (!data) notFound();

  return (
    <>
      <GoBackButton />
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={query}
        params={{ slug: slug }}
        initialData={data}
        as={ImportPreviewBlog}
      >
        <SingleBlogPost data={data} />
      </LiveQuery>
    </>
  );
};

export default BlogPost;
