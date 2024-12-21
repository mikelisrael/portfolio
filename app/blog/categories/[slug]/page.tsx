import { BlogList, GoBackButton } from "@/components/blog";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IPost } from "@/types";
import { groq } from "next-sanity";
import Header from "./_components/header";

export async function generateStaticParams() {
  const query = groq`*[_type == "category" && defined(slug)][].slug.current`;
  const slugs = await client.fetch<string[]>(query);
  return slugs.map((slug) => ({ slug }));
}

const Categories = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const query = groq`
    *[_type == "post" && defined(categories) && $slug in categories[]->slug.current]{
      ...,
      categories[]->,
      author->,
      'plainText': pt::text(body),
      'estimatedReadingTime': round(length(pt::text(body)) / 5 / 180)
    }
  `;

  const posts: IPost[] = await sanityFetch<IPost[]>({
    query,
    params: { slug },
    tags: ["post"],
  });

  const titleQuery = groq`*[_type == "category" && slug.current == $slug][0]{
    title
  }`;

  const title = await client.fetch<{ title: string }>(titleQuery, { slug });

  return (
    <main className="overflow-hidden">
      <GoBackButton />
      <Header title={title} posts={posts} />
      <BlogList posts={posts} />
    </main>
  );
};

export default Categories;
