import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import useProducts from "@/modules/products/hooks/useProducts"
import useCategories from "@/modules/category/hooks/useCategories"
import ProductCard from "@/modules/products/components/ProductCard"

const PAGE_LIMIT = 12

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1")
  const search = searchParams.get("search") ?? ""
  const category = searchParams.get("category") ?? ""

  const [searchInput, setSearchInput] = useState(search)

  const { data: categories } = useCategories()
  const { data, isLoading, isFetching } = useProducts({
    page,
    limit: PAGE_LIMIT,
    search: search || undefined,
    category: category || undefined,
  })

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    next.set("page", "1")
    setSearchParams(next)
  }

  const goToPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams)
    next.set("page", String(nextPage))
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <BackButton fallbackTo="/" />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          {search ? `Results for "${search}"` : "All Products"}
        </h1>

        <div className="flex flex-col gap-2 sm:flex-row">
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              updateParams({ search: searchInput })
            }}
          >
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search products"
              className="w-56"
            />
            <Button type="submit" size="icon" aria-label="Search">
              <Search />
            </Button>
          </form>

          <select
            value={category}
            onChange={(event) => updateParams({ category: event.target.value })}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : data && data.data.length > 0 ? (
        <>
          <div
            className={
              "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" +
              (isFetching ? " opacity-60" : "")
            }
          >
            {data.data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {data.meta.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600">
                Page {data.meta.page} of {data.meta.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= data.meta.totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="py-16 text-center text-sm text-slate-500">
          No products found.
        </p>
      )}
    </div>
  )
}

export default ProductListPage
