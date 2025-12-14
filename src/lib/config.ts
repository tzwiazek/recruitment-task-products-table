const API_BASE = "https://api.escuelajs.co/api/v1";

export const endpoints = {
  products: {
    all: `${API_BASE}/products`,
    item: (id: number) => `${API_BASE}/products/${id}`,
  },
  categories: {
    all: `${API_BASE}/categories`,
    item: (id: number) => `${API_BASE}/categories/${id}`,
  },
} as const;

export const pagination = {
  products: {
    defaultLimit: 10,
    defaultPage: 1,
    options: [
      { value: "5", label: "5 na strone" },
      { value: "10", label: "10 na strone" },
      { value: "20", label: "20 na strone" },
      { value: "50", label: "50 na strone" },
    ],
  },
} as const;

export const queryStaleTime = {
  products: 5 * 60 * 1000, // 5 minutes
  categories: 30 * 60 * 1000, // 30 minutes
  default: 60 * 1000, // 1 minute
} as const;

export const uiConstants = {
  placeholderImage: "/placeholder.png",
} as const;
