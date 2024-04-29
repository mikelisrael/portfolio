"use client";

import LiveQueryProvider from "next-sanity/preview";
import { suspend } from "suspend-react";

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol("lib/sanity.client");

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const { client } = suspend(() => import("@/sanity/lib/client"), [UniqueKey]);
  if (!token) throw new TypeError("Missing token");
  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}

      <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2 rounded-md bg-green-500 px-4 py-2 text-foreground opacity-50">
        Preview mode
      </div>
    </LiveQueryProvider>
  );
}
