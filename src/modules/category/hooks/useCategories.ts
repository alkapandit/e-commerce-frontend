import { useQuery } from "@tanstack/react-query"

import { getAllCategories } from "@/services/category.service"
import queryKeys from "@/constants/queryKeys"

const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  })

export default useCategories
