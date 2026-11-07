export type ApiEnvelope<T> = {
  success: boolean
  statusCode: number
  message: string
  data: T
  errors?: unknown
}

export type Paginated<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
