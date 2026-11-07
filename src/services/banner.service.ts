import apiClient from "@/services/apiClient"
import type { ApiEnvelope } from "@/types/api.types"

export type Banner = {
  _id: string
  imageUrl: string
  category: string
  placement: string
  active: boolean
}

export type BannerListQuery = {
  active?: "true" | "false"
  category?: string
  placement?: string
}

export const getAllBanners = async (query: BannerListQuery = {}) => {
  const { data } = await apiClient.get<ApiEnvelope<Banner[]>>("/banner", {
    params: query,
  })
  return data.data
}
