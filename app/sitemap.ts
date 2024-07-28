import { sanityFetch } from "@/sanity/lib/fetch";
import { IPost } from "@/types";
import { MetadataRoute } from "next";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const query = groq`*[_type == "post"]{
  ...,
  categories[]->,
  'plainText': pt::text(body),
  'estimatedReadingTime': round(length(pt::text(body)) / 5 / 180 )
}`;
  const posts: IPost[] = await sanityFetch({ query, tags: ["post", "author"] });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug.current}`,
    lastModified: post._updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    ...postEntries,
  ];
}
