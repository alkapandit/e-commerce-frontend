import apiClient from "@/services/apiClient"
import type { ApiEnvelope, Paginated } from "@/types/api.types"

export type ProductVariantOption = {
  _id: string
  value: string
  price?: number
  stock?: number
}

export type ProductVariant = {
  _id: string
  name: string
  options: ProductVariantOption[]
}

export type Product = {
  _id: string
  sellerId: string
  name: string
  description?: string
  price: number
  discountPrice?: number
  sku?: string
  brand?: string
  stock: number
  images: string[]
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  categoryId: string
  subCategoryId?: string
  variants: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export type ProductListQuery = {
  page?: number
  limit?: number
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}

export const getAllProducts = async (query: ProductListQuery = {}) => {
  const { data } = await apiClient.get<ApiEnvelope<Paginated<Product>>>(
    "/product",
    { params: query }
  )
  return data.data
}

export const getProductById = async (id: string) => {
  const { data } = await apiClient.get<ApiEnvelope<Product>>(`/product/${id}`)
  return data.data
}
