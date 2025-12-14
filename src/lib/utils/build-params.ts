/**
 * Builds URL query string from an object, filtering out null/undefined values
 *
 * @param obj - Object with query parameters
 * @returns URL-encoded query string
 *
 * @example
 * ```ts
 * buildParams({ page: 1, search: "laptop", limit: 10 })
 * // Returns: "page=1&search=laptop&limit=10"
 *
 * buildParams({ id: 5, filter: undefined, active: true })
 * // Returns: "id=5&active=true"
 * ```
 */
export function buildParams(
  obj: Record<string, string | number | boolean | undefined | null>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  }

  return params.toString();
}
