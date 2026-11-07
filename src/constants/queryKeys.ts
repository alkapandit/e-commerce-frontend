const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
  profile: {
    all: ["profile"] as const,
    detail: () => [...queryKeys.profile.all, "detail"] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
  },
  banners: {
    all: ["banners"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.banners.all, "list", params] as const,
  },
  products: {
    all: ["products"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.products.all, "list", params] as const,
    detail: (id: string) => [...queryKeys.products.all, "detail", id] as const,
  },
  cart: {
    all: ["cart"] as const,
    detail: () => [...queryKeys.cart.all, "detail"] as const,
  },
  wishlist: {
    all: ["wishlist"] as const,
    detail: () => [...queryKeys.wishlist.all, "detail"] as const,
  },
  addresses: {
    all: ["addresses"] as const,
    list: () => [...queryKeys.addresses.all, "list"] as const,
    detail: (id: string) => [...queryKeys.addresses.all, "detail", id] as const,
  },
  orders: {
    all: ["orders"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.orders.all, "list", params] as const,
    detail: (id: string) => [...queryKeys.orders.all, "detail", id] as const,
  },
} as const

export default queryKeys
