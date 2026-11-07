import apiClient from "@/services/apiClient"
import type { ApiEnvelope } from "@/types/api.types"
import type { Product } from "@/services/product.service"

// Product fields as selected/populated by GET /cart (see cart.service.ts on
// the backend) -- a subset of the full Product shape.
export type CartProductSummary = Pick<
  Product,
  "_id" | "name" | "images" | "price" | "discountPrice" | "stock" | "isActive"
> & {
  variants?: Product["variants"]
}

export type CartItem = {
  id: string
  quantity: number
  product: CartProductSummary | null
  variantOption: { _id: string; value: string; price?: number; stock?: number } | null
}

export type Cart = {
  id?: string
  userId: string
  cartItems: CartItem[]
}

export type AddCartItemPayload = {
  productId: string
  quantity: number
  variantOptionId?: string
}

export type UpdateCartItemPayload = {
  quantity: number
  variantOptionId?: string | null
}

export const getMyCart = async () => {
  const { data } = await apiClient.get<ApiEnvelope<Cart>>("/cart")
  return data.data
}

// The write endpoints below return the raw (unpopulated) cart item, which
// isn't very useful to render directly -- callers should just invalidate
// the cart query and let getMyCart's populated shape be the source of
// truth for what's displayed.

export const addCartItem = async (payload: AddCartItemPayload) => {
  const { data } = await apiClient.post("/cart/create", payload)
  return data.data
}

export const updateCartItem = async (
  cartItemId: string,
  payload: UpdateCartItemPayload
) => {
  const { data } = await apiClient.put(`/cart/update/${cartItemId}`, payload)
  return data.data
}

export const deleteCartItem = async (cartItemId: string) => {
  const { data } = await apiClient.delete(`/cart/${cartItemId}`)
  return data.data
}
