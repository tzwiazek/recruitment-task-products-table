"use client";

import { Group, Pagination, Select } from "@mantine/core";
import { memo } from "react";
import { pagination } from "@/lib/config";
import type { ProductsPaginationProps } from "./types/product.type";

export const ProductsPagination = memo(function ProductsPagination({
  totalProducts,
  currentPage,
  currentLimit,
  onPageChange,
  onLimitChange,
}: ProductsPaginationProps) {
  const hasMorePages = totalProducts === currentLimit;
  const totalPages = hasMorePages ? currentPage + 1 : currentPage;

  return (
    <Group justify="space-between" mt="xl">
      <Select
        value={String(currentLimit)}
        onChange={(value) =>
          onLimitChange(
            value ? Number(value) : pagination.products.defaultLimit,
          )
        }
        data={[...pagination.products.options]}
        w={150}
      />
      <Pagination
        value={currentPage}
        onChange={onPageChange}
        total={totalPages}
        siblings={1}
        boundaries={1}
      />
    </Group>
  );
});
