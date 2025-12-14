import type { CategoryType } from "@/api/categories/categories.type";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
  creationAt: string;
  updatedAt: string;
};
