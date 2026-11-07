import { Link } from "react-router-dom"
import { Heart, ImageOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import { useRemoveFromWishlist, useWishlist } from "@/modules/wishlist/hooks/useWishlist"

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const WishlistPage = () => {
  const { data: wishlist, isLoading } = useWishlist()
  const { mutate: removeFromWishlist } = useRemoveFromWishlist()

  const items = wishlist?.items.filter((item) => item.productId) ?? []

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <BackButton fallbackTo="/" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your Wishlist</h1>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Heart className="size-10 text-slate-300" />
          <p className="text-sm text-slate-500">Your wishlist is empty.</p>
          <Button render={<Link to="/products" />}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const product = item.productId!
            return (
              <div key={item._id} className="flex flex-col gap-2">
                <Link
                  to={`/products/${product._id}`}
                  className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-100"
                >
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImageOff className="size-12 text-slate-300" strokeWidth={1.25} />
                  )}
                </Link>
                <Link
                  to={`/products/${product._id}`}
                  className="line-clamp-2 text-sm font-medium text-slate-800"
                >
                  {product.name}
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(product.discountPrice ?? product.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-xs font-medium text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WishlistPage
