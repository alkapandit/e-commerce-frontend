import { useQuery } from "@tanstack/react-query"

import { getProductById } from "@/services/product.service"
import queryKeys from "@/constants/queryKeys"

const useProduct = (id: string | undefined) =>
  useQuery({
    queryKey: queryKeys.products.detail(id ?? ""),
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  })

export default useProduct
