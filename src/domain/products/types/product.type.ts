import type { CategoryType } from "@/api/categories/categories.type";
import type { ProductType } from "@/api/products/products.type";

export type ProductFiltersType = {
  search?: string;
  categoryId?: number;
  priceMin?: number;
  priceMax?: number;
};

export type ProductSortType = {
  sortBy?: "price" | "title";
  order?: "asc" | "desc";
};

export type ProductQueryParamsType = ProductFiltersType &
  ProductSortType & {
    page?: number;
    limit?: number;
  };

export type ProductsFiltersProps = {
  filters: ProductQueryParamsType;
  categories: CategoryType[] | undefined;
  categoriesLoading: boolean;
  onUpdateFilters: (updates: Partial<ProductQueryParamsType>) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
};

export type ProductsPaginationProps = {
  totalProducts: number;
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export type ProductsTableProps = {
  products: ProductType[];
  sortBy?: "price" | "title";
  order?: "asc" | "desc";
  onSort: (sortBy: "price" | "title") => void;
};
