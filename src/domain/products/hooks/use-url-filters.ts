"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { ProductQueryParamsType } from "@/domain/products/types/product.type";
import { pagination } from "@/lib/config";

const parseNumber = (value: string | null, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const parseSortBy = (value: string | null): "price" | "title" | undefined => {
  if (value === "price" || value === "title") return value;
  return undefined;
};

const parseOrder = (value: string | null): "asc" | "desc" | undefined => {
  if (value === "asc" || value === "desc") return value;
  return undefined;
};

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: ProductQueryParamsType = useMemo(() => {
    const categoryIdParam = searchParams.get("categoryId");
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");

    return {
      page: parseNumber(
        searchParams.get("page"),
        pagination.products.defaultPage,
      ),
      limit: parseNumber(
        searchParams.get("limit"),
        pagination.products.defaultLimit,
      ),
      search: searchParams.get("search") || undefined,
      categoryId: categoryIdParam ? parseNumber(categoryIdParam, 0) : undefined,
      priceMin:
        priceMinParam !== null ? parseNumber(priceMinParam, 0) : undefined,
      priceMax:
        priceMaxParam !== null ? parseNumber(priceMaxParam, 0) : undefined,
      sortBy: parseSortBy(searchParams.get("sortBy")),
      order: parseOrder(searchParams.get("order")),
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: Partial<ProductQueryParamsType>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Auto-reset page to 1 when filters change (unless explicitly updating page/limit)
      const isFilterChange =
        updates.page === undefined && Object.keys(updates).length > 0;
      if (isFilterChange) {
        current.set("page", "1");
      }

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      const query = current.toString();
      router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.categoryId ||
      filters.priceMin ||
      filters.priceMax,
  );

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}
