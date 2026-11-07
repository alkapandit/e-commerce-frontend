import apiClient from "@/services/apiClient"
import type { ApiEnvelope } from "@/types/api.types"

export type AddressType = "HOME" | "OFFICE" | "WAREHOUSE"

export type Address = {
  _id: string
  userId: string
  type: AddressType
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country: string
  pincode: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export type CreateAddressPayload = {
  userId: string
  type: AddressType
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country: string
  pincode: string
  isDefault?: boolean
}

export type UpdateAddressPayload = Partial<
  Omit<CreateAddressPayload, "userId">
> & {
  id: string
}

export const getAllAddresses = async () => {
  const { data } = await apiClient.get<ApiEnvelope<Address[]>>("/address")
  return data.data
}

export const getAddressById = async (id: string) => {
  const { data } = await apiClient.get<ApiEnvelope<Address>>(`/address/${id}`)
  return data.data
}

export const createAddress = async (payload: CreateAddressPayload) => {
  const { data } = await apiClient.post<ApiEnvelope<Address>>(
    "/address/add",
    payload
  )
  return data.data
}

export const updateAddress = async (payload: UpdateAddressPayload) => {
  const { data } = await apiClient.put<ApiEnvelope<Address>>(
    "/address/update",
    payload
  )
  return data.data
}

export const deleteAddress = async (id: string) => {
  const { data } = await apiClient.delete<ApiEnvelope<Address>>(
    `/address/${id}`
  )
  return data.data
}
