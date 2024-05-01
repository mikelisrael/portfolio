import BlogList from "@/components/blog/blog-list";
import Header from "@/components/blog/header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { IPost } from "@/types";
import { groq } from "next-sanity";
import React from "react";

const query = groq`*[_type == "post"]{
  ...,
  categories[]->,
  'plainText': pt::text(body),
  'estimatedReadingTime': round(length(pt::text(body)) / 5 / 180 )
}`;

const Blog = async () => {
  const posts: IPost[] = await sanityFetch({ query, tags: ["post", "author"]});

  return (
    <main className="overflow-hidden">
      <Header posts={posts} />
      <BlogList posts={posts} />
    </main>
  );
};

export default Blog;
