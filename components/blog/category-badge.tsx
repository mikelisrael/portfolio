"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { ICategory } from "@/types";
import { useRouter } from "next/navigation";

const CategoryBadge = ({ title, slug }: ICategory) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/blog/categories/${slug.current}`);
  };

  return (
    <Badge className="bg-background-secondary" onClick={handleClick}>
      {title}
    </Badge>
  );
};

export default CategoryBadge;
