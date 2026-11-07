import { Heart, ImageOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import type { Product } from "@/services/product.service"
import useAuthStore from "@/store/useAuthStore"
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "@/modules/wishlist/hooks/useWishlist"

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { data: wishlist } = useWishlist()
  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist()
  const { mutate: removeFromWishlist, isPending: isRemoving } =
    useRemoveFromWishlist()

  const wishlistItem = wishlist?.items.find(
    (item) => item.productId?._id === product._id
  )
  const isWishlisted = !!wishlistItem

  const handleWishlistClick = (event: React.MouseEvent) => {
    event.preventDefault()

    if (!isAuthenticated) {
      toast.info("Please sign in to use your wishlist.")
      navigate("/login")
      return
    }

    if (isWishlisted) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product._id)
    }
  }

  const effectivePrice = product.discountPrice ?? product.price
  const hasDiscount =
    product.discountPrice != null && product.discountPrice < product.price

  return (
    <Link
      to={`/products/${product._id}`}
      className="flex flex-col gap-2"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-100">
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistClick}
          disabled={isAdding || isRemoving}
          className="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-full bg-white/80 text-slate-500 transition-colors hover:text-red-500 disabled:opacity-60"
        >
          <Heart
            className={cn(
              "size-4",
              isWishlisted && "fill-red-500 text-red-500"
            )}
          />
        </button>

        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover"
          />
        ) : (
          <ImageOff className="size-12 text-slate-300" strokeWidth={1.25} />
        )}

        {!product.isActive && (
          <span className="absolute bottom-2 left-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white">
            Unavailable
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-sm font-medium text-slate-800">
        {product.name}
      </p>

      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold text-slate-900">
          {formatPrice(effectivePrice)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-slate-400 line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
