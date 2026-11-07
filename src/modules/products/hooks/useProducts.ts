import { useQuery } from "@tanstack/react-query"

import { getAllProducts, type ProductListQuery } from "@/services/product.service"
import queryKeys from "@/constants/queryKeys"

const useProducts = (query: ProductListQuery = {}) =>
  useQuery({
    queryKey: queryKeys.products.list(query),
    queryFn: () => getAllProducts(query),
    placeholderData: (previousData) => previousData,
  })

export default useProducts
