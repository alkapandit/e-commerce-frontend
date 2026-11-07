import { useQuery } from "@tanstack/react-query"

import { getMyCart } from "@/services/cart.service"
import queryKeys from "@/constants/queryKeys"
import useAuthStore from "@/store/useAuthStore"

const useCart = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: queryKeys.cart.detail(),
    queryFn: getMyCart,
    enabled: isAuthenticated,
  })
}

export default useCart
