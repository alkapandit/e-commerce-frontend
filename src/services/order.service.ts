import apiClient from "@/services/apiClient"
import type { ApiEnvelope, Paginated } from "@/types/api.types"
import type { AddressType } from "@/services/address.service"

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED"

export type OrderItem = {
  _id: string
  productId: string
  sellerId: string
  name: string
  unitPrice: number
  quantity: number
  variantOptionId?: string
  image?: string
}

export type OrderShippingAddress = {
  type?: AddressType
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country: string
  pincode: string
}

export type OrderPricing = {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export type Order = {
  _id: string
  userId: string
  items: OrderItem[]
  shippingAddress: OrderShippingAddress
  pricing: OrderPricing
  status: OrderStatus
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED"
  placedAt: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
  cancelledAt?: string
  cancelReason?: string
  createdAt: string
  updatedAt: string
}

export type PlaceOrderPayload = {
  addressId: string
  idempotencyKey?: string
}

export type OrderListQuery = {
  page?: number
  limit?: number
  status?: OrderStatus
}

export const placeOrder = async (payload: PlaceOrderPayload) => {
  const { data } = await apiClient.post<ApiEnvelope<Order>>("/order", payload)
  return data.data
}

export const getMyOrders = async (query: OrderListQuery = {}) => {
  const { data } = await apiClient.get<ApiEnvelope<Paginated<Order>>>(
    "/order",
    { params: query }
  )
  return data.data
}

export const getOrderById = async (id: string) => {
  const { data } = await apiClient.get<ApiEnvelope<Order>>(`/order/${id}`)
  return data.data
}

export const cancelOrder = async (id: string, reason?: string) => {
  const { data } = await apiClient.patch<ApiEnvelope<Order>>(
    `/order/${id}/cancel`,
    { reason }
  )
  return data.data
}
