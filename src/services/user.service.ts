import apiClient from "@/services/apiClient"
import type { ApiEnvelope } from "@/types/api.types"

export type UserProfile = {
  _id: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  createdAt: string
  updatedAt: string
}

export type UpdateProfilePayload = {
  firstName?: string
  lastName?: string
  phone?: string
}

export const getProfile = async () => {
  const { data } = await apiClient.get<ApiEnvelope<UserProfile>>("/user/profile")
  return data.data
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data } = await apiClient.put<ApiEnvelope<UserProfile>>(
    "/user/update",
    payload
  )
  return data.data
}
