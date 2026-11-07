import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { register } from "@/services/auth.service"
import type { ApiEnvelope, RegisterPayload } from "@/auth/types/auth.types"

const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      toast.success("Account created. Please sign in.")
      navigate("/login")
    },
    onError: (error: AxiosError<ApiEnvelope<null>>) => {
      const message =
        error.response?.data?.message ??
        "Unable to create your account. Please try again."
      toast.error(message)
    },
  })
}

export default useRegister
