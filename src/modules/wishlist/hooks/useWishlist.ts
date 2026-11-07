import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service"
import type { ApiEnvelope } from "@/types/api.types"
import queryClient from "@/lib/queryClient"
import queryKeys from "@/constants/queryKeys"
import useAuthStore from "@/store/useAuthStore"

export const useWishlist = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: queryKeys.wishlist.detail(),
    queryFn: getMyWishlist,
    enabled: isAuthenticated,
  })
}

const invalidateWishlist = () =>
  queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all })

const showError = (fallback: string) => (error: AxiosError<ApiEnvelope<null>>) => {
  toast.error(error.response?.data?.message ?? fallback)
}

export const useAddToWishlist = () =>
  useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      invalidateWishlist()
      toast.success("Added to wishlist.")
    },
    onError: showError("Unable to add this item to your wishlist."),
  })

export const useRemoveFromWishlist = () =>
  useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      invalidateWishlist()
      toast.success("Removed from wishlist.")
    },
    onError: showError("Unable to remove this item."),
  })
