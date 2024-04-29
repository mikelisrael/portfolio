import { token } from "@/sanity/lib/fetch";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import React from "react";
import { AppProvider } from "./context";

const PreviewProvider = dynamic(
  () => import("@/components/providers/preview-provider"),
);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppProvider>
        {draftMode().isEnabled ? (
          <PreviewProvider token={token}>{children}</PreviewProvider>
        ) : (
          children
        )}
      </AppProvider>
    </>
  );
};

export default Providers;
