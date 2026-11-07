export type { ApiEnvelope } from "@/types/api.types"

export type LoginPayload = {
  identifier: string
  password: string
}

export type RegisterPayload = {
  email: string
  firstName: string
  lastName: string
  password: string
  phone: string
  userType: "buyer" | "seller"
}

export type AuthUser = {
  id: string
  email: string
  role: string
  firstName?: string
  lastName?: string
  avatar?: string
}

export type LoginResponse = {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export type RegisterResponse = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  role: string
}
