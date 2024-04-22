import "server-only";

import { QueryParams } from "next-sanity";
import { client } from "./client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    // disable cache in development
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}
