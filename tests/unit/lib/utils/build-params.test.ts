import { describe, expect, it } from "vitest";
import { buildParams } from "@/lib/utils/build-params";

describe("buildParams", () => {
  it("creates URL query parameters from filter object", () => {
    const result = buildParams({
      page: 1,
      limit: 10,
      active: true,
    });

    expect(result).toBe("page=1&limit=10&active=true");
  });

  it("omits missing or empty filters from URL", () => {
    const result = buildParams({
      page: 1,
      filter: undefined,
      active: null,
      search: "",
    });

    expect(result).toBe("page=1");
  });

  it("includes zero price filters in search", () => {
    const result = buildParams({ priceMin: 0, categoryId: 0 });

    expect(result).toBe("priceMin=0&categoryId=0");
  });

  it("returns empty URL when no filters applied", () => {
    expect(buildParams({})).toBe("");
    expect(buildParams({ a: undefined, b: null, c: "" })).toBe("");
  });
});
