"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";

import _config from "../../../sanity.config";

export default function IndexPage() {
  const [config, setConfig] = useState(_config);

  useEffect(
    // Start fetching the theme in parallel with the Studio auth loading
    () =>
      // The webpackIgnore tells webpack to not attempt bundling this dynamic import,
      // and instead let it run natively in the browser at runtime
      void import(
        /* webpackIgnore: true */ "https://themer.sanity.build/api/hues?primary=ffc25c;lightest:ebebec;darkest:333646"
      ).then(({ theme }) => setConfig((config) => ({ ...config, theme }))),
    [],
  );

  return <NextStudio config={config} />;
}
