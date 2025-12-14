import type { ProductType } from "@/api/products/products.type";

/**
 * Sort products array by specified field and order
 *
 * @param products - Array of products to sort
 * @param sortBy - Field to sort by (price or title)
 * @param order - Sort order (asc or desc)
 * @returns Sorted array of products
 *
 * @example
 * ```ts
 * sortProducts(products, "price", "asc")
 * sortProducts(products, "title", "desc")
 * ```
 */

export function sortProducts(
  products: ProductType[],
  sortBy: "price" | "title",
  order: "asc" | "desc" = "asc",
): ProductType[] {
  return [...products].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "price") {
      comparison = a.price - b.price;
    } else if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    }

    return order === "desc" ? -comparison : comparison;
  });
}
