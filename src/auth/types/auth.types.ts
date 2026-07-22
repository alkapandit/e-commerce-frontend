export type LoginPayload = {
  identifier: string
  password: string
}

export type AuthUser = {
  email: string
  role: string
}

export type LoginResponse = {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export type ApiEnvelope<T> = {
  success: boolean
  statusCode: number
  message: string
  data: T
}
