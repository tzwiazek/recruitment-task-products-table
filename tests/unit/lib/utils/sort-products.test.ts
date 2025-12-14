import { describe, expect, it } from "vitest";
import type { ProductType } from "@/api/products/products.type";
import { sortProducts } from "@/lib/utils/sort-products";

const createProduct = (
  id: number,
  title: string,
  price: number,
): ProductType => ({
  id,
  title,
  price,
  description: "",
  category: { id: 0, name: "", image: "", creationAt: "", updatedAt: "" },
  images: [],
  creationAt: "",
  updatedAt: "",
});

const mockProducts: ProductType[] = [
  createProduct(1, "Zebra Shirt", 100),
  createProduct(2, "Apple Watch", 50),
  createProduct(3, "Mouse Pad", 75),
];

describe("sortProducts", () => {
  describe("sorting by price", () => {
    it("shows cheapest products first", () => {
      const result = sortProducts(mockProducts, "price", "asc");

      expect(result.map((p) => p.price)).toEqual([50, 75, 100]);
    });

    it("shows most expensive products first", () => {
      const result = sortProducts(mockProducts, "price", "desc");

      expect(result.map((p) => p.price)).toEqual([100, 75, 50]);
    });

    it("defaults to showing cheapest first", () => {
      const result = sortProducts(mockProducts, "price");

      expect(result[0].price).toBe(50);
    });
  });

  describe("sorting by name", () => {
    it("arranges products alphabetically", () => {
      const result = sortProducts(mockProducts, "title", "asc");

      expect(result.map((p) => p.title)).toEqual([
        "Apple Watch",
        "Mouse Pad",
        "Zebra Shirt",
      ]);
    });

    it("arranges products in reverse alphabetical order", () => {
      const result = sortProducts(mockProducts, "title", "desc");

      expect(result.map((p) => p.title)).toEqual([
        "Zebra Shirt",
        "Mouse Pad",
        "Apple Watch",
      ]);
    });

    it("handles international characters correctly", () => {
      const products = [
        createProduct(1, "Äpfel", 1),
        createProduct(2, "Zebra", 2),
        createProduct(3, "Birne", 3),
      ];

      const result = sortProducts(products, "title", "asc");

      expect(result.map((p) => p.title)).toEqual(["Äpfel", "Birne", "Zebra"]);
    });
  });

  describe("preserving original data", () => {
    it("keeps original product list unchanged", () => {
      const original = [...mockProducts];

      sortProducts(mockProducts, "price", "asc");

      expect(mockProducts).toEqual(original);
    });
  });

  describe("edge cases", () => {
    it("handles empty product list", () => {
      const result = sortProducts([], "price", "asc");

      expect(result).toEqual([]);
    });

    it("handles single product", () => {
      const single = [mockProducts[0]];
      const result = sortProducts(single, "price", "asc");

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(single[0]);
    });
  });
});
