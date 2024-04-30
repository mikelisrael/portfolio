"use client";

import React from "react";
import { Button } from "../ui/button";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <Button
      className="fixed top-40 hidden -translate-x-20 text-lg lg:flex"
      variant="secondary"
      onClick={goBack}
    >
      <IoArrowBack />
    </Button>
  );
};

export default GoBackButton;
