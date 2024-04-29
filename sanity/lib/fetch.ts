import "server-only";

import type { QueryOptions, QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { client } from "./client";

export const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required.",
    );
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token: token,
        perspective: "previewDrafts",
      } satisfies QueryOptions)),
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: {
      // revalidate: isDraftMode ? undefined : 10, //if in draft mode, set to undefined, else revalidate every 10 seconds
      tags,
    },
  });
}
