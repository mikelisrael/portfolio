"use client";

import React from "react";
import { useGlobalContext } from "@/components/providers/context";

const ContactRef = ({
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  const { contactRef } = useGlobalContext();

  return (
    <section ref={contactRef} {...props}>
      {children}
    </section>
  );
};

export default ContactRef;
