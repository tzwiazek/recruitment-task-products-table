import type { ProductQueryParamsType } from "@/domain/products/types/product.type";
import { endpoints, pagination } from "@/lib/config";
import { buildParams } from "@/lib/utils/build-params";
import type { ProductType } from "./products.type";

export async function getProducts(
  params: ProductQueryParamsType = {},
): Promise<ProductType[]> {
  const {
    page = pagination.products.defaultPage,
    limit = pagination.products.defaultLimit,
    search,
    categoryId,
    priceMin,
    priceMax,
  } = params;

  const offset = (page - 1) * limit;

  const queryParams = buildParams({
    offset,
    limit,
    title: search,
    categoryId,
    price_min: priceMin,
    price_max: priceMax,
  });

  const url = `${endpoints.products.all}?${queryParams}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
