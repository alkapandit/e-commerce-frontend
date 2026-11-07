import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  updateAddress,
  type CreateAddressPayload,
  type UpdateAddressPayload,
} from "@/services/address.service"
import type { ApiEnvelope } from "@/types/api.types"
import queryClient from "@/lib/queryClient"
import queryKeys from "@/constants/queryKeys"
import useAuthStore from "@/store/useAuthStore"

export const useAddresses = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: queryKeys.addresses.list(),
    queryFn: getAllAddresses,
    enabled: isAuthenticated,
  })
}

const invalidateAddresses = () =>
  queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all })

const showError = (fallback: string) => (error: AxiosError<ApiEnvelope<null>>) => {
  toast.error(error.response?.data?.message ?? fallback)
}

export const useCreateAddress = () =>
  useMutation({
    mutationFn: (payload: CreateAddressPayload) => createAddress(payload),
    onSuccess: () => {
      invalidateAddresses()
      toast.success("Address saved.")
    },
    onError: showError("Unable to save this address."),
  })

export const useUpdateAddress = () =>
  useMutation({
    mutationFn: (payload: UpdateAddressPayload) => updateAddress(payload),
    onSuccess: () => {
      invalidateAddresses()
      toast.success("Address updated.")
    },
    onError: showError("Unable to update this address."),
  })

export const useDeleteAddress = () =>
  useMutation({
    mutationFn: (id: string) => deleteAddress(id),
    onSuccess: () => {
      invalidateAddresses()
      toast.success("Address removed.")
    },
    onError: showError("Unable to remove this address."),
  })
