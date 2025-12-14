"use client";

import { useQuery } from "@tanstack/react-query";
import type { CategoryType } from "@/api/categories/categories.type";
import { getCategories } from "@/api/categories/get-categories";
import { queryStaleTime } from "@/lib/config";

export function useCategories() {
  return useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: queryStaleTime.categories,
  });
}
