import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { login } from "@/services/auth.service"
import useAuthStore from "@/store/useAuthStore"
import type { ApiEnvelope, LoginPayload } from "@/auth/types/auth.types"

const useLogin = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      setUser(data.user)
      toast.success("Signed in successfully.")
      navigate("/")
    },
    onError: (error: AxiosError<ApiEnvelope<null>>) => {
      const message =
        error.response?.data?.message ?? "Unable to sign in. Please try again."
      toast.error(message)
    },
  })
}

export default useLogin
