"use client";

import {
  Alert,
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Suspense, useCallback } from "react";
import { useCategories } from "@/domain/products/hooks/use-categories";
import { useProducts } from "@/domain/products/hooks/use-products";
import { useUrlFilters } from "@/domain/products/hooks/use-url-filters";
import { ProductsFilters } from "@/domain/products/products-filters";
import { ProductsPagination } from "@/domain/products/products-pagination";
import { ProductsTable } from "@/domain/products/products-table";

function ProductsContent() {
  const { filters, updateFilters, resetFilters, hasActiveFilters } =
    useUrlFilters();
  const { data: products, isLoading, error, refetch } = useProducts(filters);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleSort = (column: "price" | "title") => {
    const newOrder =
      filters.sortBy === column && filters.order === "asc" ? "desc" : "asc";
    updateFilters({ sortBy: column, order: newOrder });
  };

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ page });
    },
    [updateFilters],
  );

  const handleLimitChange = useCallback(
    (limit: number) => {
      updateFilters({ limit, page: 1 });
    },
    [updateFilters],
  );

  return (
    <>
      <Paper shadow="sm" p="md" withBorder>
        <ProductsFilters
          filters={filters}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onUpdateFilters={updateFilters}
          onResetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </Paper>

      {isLoading && (
        <Group justify="center" py="xl">
          <Loader size="lg" />
        </Group>
      )}

      {error && (
        <Alert title="Błąd ładowania" color="red">
          <Stack gap="sm">
            <Text>Nie udało się załadować produktów.</Text>
            {error instanceof Error && (
              <Text size="sm" c="dimmed">
                {error.message}
              </Text>
            )}
            <Button variant="light" onClick={() => refetch()}>
              Spróbuj ponownie
            </Button>
          </Stack>
        </Alert>
      )}

      {!isLoading && !error && products && (
        <>
          <ProductsTable
            products={products}
            sortBy={filters.sortBy}
            order={filters.order}
            onSort={handleSort}
          />
          <ProductsPagination
            totalProducts={products.length}
            currentPage={filters.page || 1}
            currentLimit={filters.limit || 10}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Tabela produktów</Title>
        <Suspense
          fallback={
            <Group justify="center" py="xl">
              <Loader size="lg" />
            </Group>
          }
        >
          <ProductsContent />
        </Suspense>
      </Stack>
    </Container>
  );
}
