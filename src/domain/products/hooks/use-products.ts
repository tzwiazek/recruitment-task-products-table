"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getProducts } from "@/api/products/get-products";
import type { ProductQueryParamsType } from "@/domain/products/types/product.type";
import { queryStaleTime } from "@/lib/config";
import { sortProducts } from "@/lib/utils/sort-products";

export function useProducts(params: ProductQueryParamsType) {
  const { sortBy, order, ...apiParams } = params;

  const query = useQuery({
    queryKey: ["products", { ...apiParams, sortBy, order }],
    queryFn: () => getProducts(apiParams),
    staleTime: queryStaleTime.products,
  });

  // NOTE: API doesn't support server-side sorting - implementing client-side as fallback
  const sortedData = useMemo(() => {
    if (!query.data || !sortBy) return query.data;
    return sortProducts(query.data, sortBy, order);
  }, [query.data, sortBy, order]);

  return {
    ...query,
    data: sortedData,
  };
}
