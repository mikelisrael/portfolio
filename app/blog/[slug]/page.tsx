import GoBackButton from "@/components/blog/go-back-button";
import ImportPreviewBlog from "@/components/blog/import-preview-Blog";
import SingleBlogPost from "@/components/blog/single-blog-post";
import HeaderRef from "@/components/home/header-ref";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IPost } from "@/types";
import { groq } from "next-sanity";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

// TODO: Create open-graph image for slugs

// get query params
export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug)][].slug.current`;
  const slugs = await client.fetch<string[]>(query);
  return slugs.map((slug) => ({ slug }));
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  categories[]->,
  author->,
   'estimatedReadingTime': round(length(pt::text(body)) / 5 / 180 )
}`;

const BlogPost = async ({ params: { slug } }: { params: { slug: string } }) => {
  const data: IPost = await sanityFetch<IPost>({
    query,
    params: { slug },
    tags: ["post"], // will revalidate for post changes
  });

  if (!data) notFound();

  return (
    <>
      <HeaderRef />
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

// segment(whole page) revalidate every 10 seconds - not based on search
export const revalidate = 10; // doesn't seem to do anything...
//NEXT js team need to fix up fr
