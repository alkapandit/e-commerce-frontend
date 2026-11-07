import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import { cn } from "@/lib/utils"
import useCart from "@/modules/cart/hooks/useCart"
import { useAddresses } from "@/modules/address/hooks/useAddresses"
import { usePlaceOrder } from "@/modules/orders/hooks/useOrders"
import type { CartItem } from "@/services/cart.service"

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const getUnitPrice = (item: CartItem) =>
  item.variantOption?.price ?? item.product?.discountPrice ?? item.product?.price ?? 0

const CheckoutPage = () => {
  const { data: cart, isLoading: isCartLoading } = useCart()
  const { data: addresses, isLoading: isAddressesLoading } = useAddresses()
  const { mutate: placeOrder, isPending } = usePlaceOrder()

  const [selectedAddressId, setSelectedAddressId] = useState<string>()

  // Stable for this page visit -- lets a retried request (network blip,
  // double click) land on the same order instead of creating a duplicate.
  const idempotencyKey = useMemo(() => crypto.randomUUID(), [])

  const items = cart?.cartItems ?? []
  const subtotal = items.reduce(
    (sum, item) => sum + getUnitPrice(item) * item.quantity,
    0
  )

  const defaultAddress = addresses?.find((address) => address.isDefault)
  const activeAddressId =
    selectedAddressId ?? defaultAddress?._id ?? addresses?.[0]?._id

  if (isCartLoading || isAddressesLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-8">
        <BackButton fallbackTo="/cart" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-8">
        <BackButton fallbackTo="/cart" />
        <div className="py-16 text-center">
          <p className="text-sm text-slate-500">Your cart is empty.</p>
          <Button className="mt-4" render={<Link to="/products" />}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <BackButton fallbackTo="/cart" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Shipping Address
              </h2>
              <Link
                to="/addresses"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Manage Addresses
              </Link>
            </div>

            {!addresses || addresses.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <MapPin className="size-8 text-slate-300" />
                <p className="text-sm text-slate-500">
                  You don't have any saved addresses yet.
                </p>
                <Button render={<Link to="/addresses" />}>Add an Address</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {addresses.map((address) => (
                  <label
                    key={address._id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm",
                      activeAddressId === address._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200"
                    )}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-1"
                      checked={activeAddressId === address._id}
                      onChange={() => setSelectedAddressId(address._id)}
                    />
                    <span>
                      <span className="font-medium text-slate-900">
                        {address.type}
                      </span>
                      <br />
                      {address.addressLine1}
                      {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
                      {address.city}, {address.state}, {address.country} -{" "}
                      {address.pincode}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Items ({items.length})
            </h2>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-700">
                    {item.product?.name ?? "Item"} × {item.quantity}
                  </span>
                  <span className="font-medium text-slate-900">
                    {formatPrice(getUnitPrice(item) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex h-fit flex-col gap-4 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Order Total</h2>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-slate-400">
            Final shipping, tax and discounts are calculated when your order
            is placed.
          </p>
          <Button
            size="lg"
            disabled={!activeAddressId || isPending}
            onClick={() =>
              activeAddressId &&
              placeOrder({ addressId: activeAddressId, idempotencyKey })
            }
          >
            {isPending ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
