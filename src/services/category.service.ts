import apiClient from "@/services/apiClient"
import type { ApiEnvelope } from "@/types/api.types"

export type Category = {
  _id: string
  name: string
}

export const getAllCategories = async () => {
  const { data } = await apiClient.get<ApiEnvelope<Category[]>>("/category")
  return data.data
}
