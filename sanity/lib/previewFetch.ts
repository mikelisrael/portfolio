import "server-only";

import type { QueryOptions, QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { client } from "./client";

export const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

export async function previewSanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}) {
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
    next: {
      revalidate: isDraftMode ? 0 : 10, //if in draft mode, revalidate every time, else revalidate every 10 seconds
      tags,
    },
  });
}
