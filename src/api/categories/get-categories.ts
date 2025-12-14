import { endpoints } from "@/lib/config";
import type { CategoryType } from "./categories.type";

export async function getCategories(): Promise<CategoryType[]> {
  const response = await fetch(endpoints.categories.all);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
