import apiClient from "@/services/apiClient"
import type {
  ApiEnvelope,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/auth/types/auth.types"

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<ApiEnvelope<LoginResponse>>(
    "/auth/login",
    payload
  )
  return data.data
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<ApiEnvelope<RegisterResponse>>(
    "/auth/register",
    payload
  )
  return data.data
}

export const logout = async () => {
  await apiClient.post("/auth/logout")
}
