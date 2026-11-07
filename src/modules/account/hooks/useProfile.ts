import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import {
  getProfile,
  updateProfile,
  type UpdateProfilePayload,
} from "@/services/user.service"
import type { ApiEnvelope } from "@/types/api.types"
import queryClient from "@/lib/queryClient"
import queryKeys from "@/constants/queryKeys"
import useAuthStore from "@/store/useAuthStore"

export const useProfile = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: queryKeys.profile.detail(),
    queryFn: getProfile,
    enabled: isAuthenticated,
  })
}

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all })
      toast.success("Profile updated.")
    },
    onError: (error: AxiosError<ApiEnvelope<null>>) => {
      toast.error(
        error.response?.data?.message ?? "Unable to update your profile."
      )
    },
  })
