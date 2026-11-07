import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import {
  addCartItem,
  deleteCartItem,
  updateCartItem,
  type AddCartItemPayload,
  type UpdateCartItemPayload,
} from "@/services/cart.service"
import type { ApiEnvelope } from "@/types/api.types"
import queryClient from "@/lib/queryClient"
import queryKeys from "@/constants/queryKeys"

const showError = (fallback: string) => (error: AxiosError<ApiEnvelope<null>>) => {
  toast.error(error.response?.data?.message ?? fallback)
}

const invalidateCart = () =>
  queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })

export const useAddToCart = () =>
  useMutation({
    mutationFn: (payload: AddCartItemPayload) => addCartItem(payload),
    onSuccess: () => {
      invalidateCart()
      toast.success("Added to cart.")
    },
    onError: showError("Unable to add this item to your cart."),
  })

export const useUpdateCartItem = () =>
  useMutation({
    mutationFn: ({
      cartItemId,
      payload,
    }: {
      cartItemId: string
      payload: UpdateCartItemPayload
    }) => updateCartItem(cartItemId, payload),
    onSuccess: invalidateCart,
    onError: showError("Unable to update your cart."),
  })

export const useRemoveCartItem = () =>
  useMutation({
    mutationFn: (cartItemId: string) => deleteCartItem(cartItemId),
    onSuccess: () => {
      invalidateCart()
      toast.success("Removed from cart.")
    },
    onError: showError("Unable to remove this item."),
  })
