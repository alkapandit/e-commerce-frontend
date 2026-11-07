import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import {
  cancelOrder,
  getMyOrders,
  getOrderById,
  placeOrder,
  type OrderListQuery,
  type PlaceOrderPayload,
} from "@/services/order.service"
import type { ApiEnvelope } from "@/types/api.types"
import queryClient from "@/lib/queryClient"
import queryKeys from "@/constants/queryKeys"

const showError = (fallback: string) => (error: AxiosError<ApiEnvelope<null>>) => {
  toast.error(error.response?.data?.message ?? fallback)
}

export const useOrders = (query: OrderListQuery = {}) =>
  useQuery({
    queryKey: queryKeys.orders.list(query),
    queryFn: () => getMyOrders(query),
  })

export const useOrder = (id: string | undefined) =>
  useQuery({
    queryKey: queryKeys.orders.detail(id ?? ""),
    queryFn: () => getOrderById(id as string),
    enabled: !!id,
  })

export const usePlaceOrder = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: PlaceOrderPayload) => placeOrder(payload),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })
      toast.success("Order placed successfully.")
      navigate(`/orders/${order._id}`)
    },
    onError: showError("Unable to place your order. Please try again."),
  })
}

export const useCancelOrder = () =>
  useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      cancelOrder(id, reason),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
      queryClient.setQueryData(queryKeys.orders.detail(order._id), order)
      toast.success("Order cancelled.")
    },
    onError: showError("Unable to cancel this order."),
  })
