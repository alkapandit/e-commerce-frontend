import { useQuery } from "@tanstack/react-query"

import { getAllBanners, type BannerListQuery } from "@/services/banner.service"
import queryKeys from "@/constants/queryKeys"

const useBanners = (query: BannerListQuery = {}) =>
  useQuery({
    queryKey: queryKeys.banners.list(query),
    queryFn: () => getAllBanners(query),
    staleTime: 5 * 60 * 1000,
  })

export default useBanners
