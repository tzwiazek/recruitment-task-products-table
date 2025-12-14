"use client";

import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { memo, useMemo } from "react";
import type { ProductsFiltersProps } from "./types/product.type";

export const ProductsFilters = memo(function ProductsFilters({
  filters,
  categories,
  categoriesLoading,
  onUpdateFilters,
  onResetFilters,
  hasActiveFilters,
}: ProductsFiltersProps) {
  const categoryOptions = useMemo(
    () =>
      categories?.map((cat) => ({
        value: String(cat.id),
        label: cat.name,
      })) || [],
    [categories],
  );

  return (
    <Stack gap="md">
      <Group grow>
        <TextInput
          placeholder="Szukaj po nazwie produktu..."
          value={filters.search || ""}
          onChange={(e) => onUpdateFilters({ search: e.currentTarget.value })}
        />
        <Select
          placeholder="Wszystkie kategorie"
          data={categoryOptions}
          value={filters.categoryId ? String(filters.categoryId) : null}
          onChange={(value) =>
            onUpdateFilters({ categoryId: value ? Number(value) : undefined })
          }
          clearable
          disabled={categoriesLoading}
        />
      </Group>

      <Group grow>
        <NumberInput
          placeholder="Cena min"
          value={filters.priceMin || ""}
          onChange={(value) =>
            onUpdateFilters({ priceMin: value ? Number(value) : undefined })
          }
          min={0}
        />
        <NumberInput
          placeholder="Cena max"
          value={filters.priceMax || ""}
          onChange={(value) =>
            onUpdateFilters({ priceMax: value ? Number(value) : undefined })
          }
          min={0}
        />
      </Group>

      {hasActiveFilters && (
        <Button variant="light" onClick={onResetFilters}>
          Wyczyść filtry
        </Button>
      )}
    </Stack>
  );
});
