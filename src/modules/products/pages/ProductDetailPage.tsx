import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Heart, ImageOff, Minus, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import { cn } from "@/lib/utils"
import useProduct from "@/modules/products/hooks/useProduct"
import useAuthStore from "@/store/useAuthStore"
import { useAddToCart } from "@/modules/cart/hooks/useCartMutations"
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

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { data: product, isLoading } = useProduct(id)
  const { data: wishlist } = useWishlist()
  const { mutate: addToWishlist } = useAddToWishlist()
  const { mutate: removeFromWishlist } = useRemoveFromWishlist()
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [variantOptionId, setVariantOptionId] = useState<string | undefined>()

  const allOptions = useMemo(
    () =>
      product?.variants.flatMap((variant) =>
        variant.options.map((option) => ({ ...option, groupName: variant.name }))
      ) ?? [],
    [product]
  )

  const selectedOption = allOptions.find((opt) => opt._id === variantOptionId)

  const isWishlisted = !!wishlist?.items.find(
    (item) => item.productId?._id === id
  )

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <BackButton fallbackTo="/products" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <BackButton fallbackTo="/products" />
        <p className="py-16 text-center text-sm text-slate-500">
          Product not found.
        </p>
      </div>
    )
  }

  const effectivePrice = selectedOption?.price ?? product.discountPrice ?? product.price
  const availableStock = selectedOption?.stock ?? product.stock
  const hasVariants = allOptions.length > 0
  const canAddToCart =
    product.isActive &&
    availableStock > 0 &&
    (!hasVariants || !!variantOptionId)

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to use your wishlist.")
      navigate("/login")
      return
    }
    if (isWishlisted) removeFromWishlist(product._id)
    else addToWishlist(product._id)
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to add items to your cart.")
      navigate("/login")
      return
    }
    addToCart({ productId: product._id, quantity, variantOptionId })
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <BackButton fallbackTo="/products" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
            {product.images?.[activeImage] ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="size-full object-cover"
              />
            ) : (
              <ImageOff className="size-16 text-slate-300" strokeWidth={1.25} />
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "size-16 shrink-0 overflow-hidden rounded-lg border-2",
                    activeImage === index ? "border-blue-500" : "border-transparent"
                  )}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            {product.brand && (
              <p className="text-sm font-medium text-blue-600">{product.brand}</p>
            )}
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(effectivePrice)}
            </span>
            {product.discountPrice != null &&
              product.discountPrice < product.price &&
              !selectedOption?.price && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
          </div>

          {product.description && (
            <p className="text-sm text-slate-600">{product.description}</p>
          )}

          {hasVariants && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-800">
                Select an option
              </span>
              <div className="flex flex-wrap gap-2">
                {allOptions.map((option) => (
                  <button
                    key={option._id}
                    type="button"
                    onClick={() => setVariantOptionId(option._id)}
                    disabled={option.stock === 0}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                      variantOptionId === option._id
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    )}
                  >
                    {option.groupName}: {option.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-slate-500">
            {product.isActive
              ? availableStock > 0
                ? `${availableStock} in stock`
                : "Out of stock"
              : "This product is currently unavailable"}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-9 items-center justify-center text-slate-600 hover:text-slate-900"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(availableStock || 1, q + 1))
                }
                className="flex size-9 items-center justify-center text-slate-600 hover:text-slate-900"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1"
              disabled={!canAddToCart || isAddingToCart}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>

            <Button
              variant="outline"
              size="icon-lg"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlistToggle}
            >
              <Heart className={cn(isWishlisted && "fill-red-500 text-red-500")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
