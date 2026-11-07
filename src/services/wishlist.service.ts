import apiClient from "@/services/apiClient"
import type { ApiEnvelope } from "@/types/api.types"
import type { Product } from "@/services/product.service"

export type WishlistProductSummary = Pick<
  Product,
  "_id" | "name" | "images" | "price" | "discountPrice" | "stock" | "isActive"
>

export type WishlistItem = {
  _id: string
  productId: WishlistProductSummary | null
}

export type Wishlist = {
  userId: string
  items: WishlistItem[]
}

export const getMyWishlist = async () => {
  const { data } = await apiClient.get<ApiEnvelope<Wishlist>>("/wishlist")
  return data.data
}

// Response shapes for these two aren't populated/useful to render directly
// -- callers should invalidate the wishlist query and read from
// getMyWishlist instead.

export const addToWishlist = async (productId: string) => {
  const { data } = await apiClient.post("/wishlist/add", { productId })
  return data.data
}

export const removeFromWishlist = async (productId: string) => {
  const { data } = await apiClient.delete(`/wishlist/${productId}`)
  return data.data
}
