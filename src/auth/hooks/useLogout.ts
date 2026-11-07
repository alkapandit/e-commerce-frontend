import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { logout } from "@/services/auth.service"
import useAuthStore from "@/store/useAuthStore"
import queryClient from "@/lib/queryClient"

const useLogout = () => {
  const navigate = useNavigate()
  const clearUser = useAuthStore((state) => state.clearUser)

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      // Clear client state regardless of whether the server call succeeded
      // -- an expired session should still let the user "log out" locally.
      clearUser()
      queryClient.clear()
      toast.success("Signed out successfully.")
      navigate("/")
    },
  })
}

export default useLogout
