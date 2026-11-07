import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import useCart from "@/modules/cart/hooks/useCart"
import {
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/modules/cart/hooks/useCartMutations"
import type { CartItem } from "@/services/cart.service"

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const getUnitPrice = (item: CartItem) =>
  item.variantOption?.price ?? item.product?.discountPrice ?? item.product?.price ?? 0

const CartRow = ({ item }: { item: CartItem }) => {
  const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem()
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem()

  const unitPrice = getUnitPrice(item)
  const availableStock = item.variantOption?.stock ?? item.product?.stock ?? 0

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
        {item.product?.images?.[0] ? (
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="size-full object-cover"
          />
        ) : (
          <ShoppingCart className="size-6 text-slate-300" />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          {item.product?.name ?? "Product no longer available"}
        </p>
        {item.variantOption && (
          <p className="text-xs text-slate-500">{item.variantOption.value}</p>
        )}
        <p className="mt-1 text-sm font-semibold text-slate-900">
          {formatPrice(unitPrice)}
        </p>
      </div>

      <div className="flex items-center rounded-lg border border-slate-200">
        <button
          type="button"
          disabled={isUpdating}
          onClick={() =>
            updateItem({
              cartItemId: item.id,
              payload: { quantity: Math.max(0, item.quantity - 1) },
            })
          }
          className="flex size-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-50"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-7 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <button
          type="button"
          disabled={isUpdating || item.quantity >= availableStock}
          onClick={() =>
            updateItem({
              cartItemId: item.id,
              payload: { quantity: item.quantity + 1 },
            })
          }
          className="flex size-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-50"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      <p className="w-24 text-right text-sm font-semibold text-slate-900">
        {formatPrice(unitPrice * item.quantity)}
      </p>

      <button
        type="button"
        aria-label="Remove item"
        disabled={isRemoving}
        onClick={() => removeItem(item.id)}
        className="text-slate-400 transition-colors hover:text-red-500 disabled:opacity-50"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  )
}

const CartPage = () => {
  const { data: cart, isLoading } = useCart()

  const items = cart?.cartItems ?? []
  const subtotal = items.reduce(
    (sum, item) => sum + getUnitPrice(item) * item.quantity,
    0
  )

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <BackButton fallbackTo="/products" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your Cart</h1>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <ShoppingCart className="size-10 text-slate-300" />
          <p className="text-sm text-slate-500">Your cart is empty.</p>
          <Button render={<Link to="/products" />}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm lg:col-span-2">
            {items.map((item) => (
              <CartRow key={item.id} item={item} />
            ))}
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-slate-400">
              Shipping, tax and discounts are calculated at checkout.
            </p>
            <Button size="lg" render={<Link to="/checkout" />}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
