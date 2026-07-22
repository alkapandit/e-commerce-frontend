import apiClient from "@/services/apiClient"
import type {
  ApiEnvelope,
  LoginPayload,
  LoginResponse,
} from "@/auth/types/auth.types"

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<ApiEnvelope<LoginResponse>>(
    "/auth/login",
    payload
  )
  return data.data
}
