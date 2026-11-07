import { useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCancelOrder, useOrder } from "@/modules/orders/hooks/useOrders"

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const CANCELLABLE_STATUSES = ["PENDING_PAYMENT", "PAID", "PROCESSING"]

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: order, isLoading } = useOrder(id)
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <BackButton fallbackTo="/orders" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <BackButton fallbackTo="/orders" />
        <p className="py-16 text-center text-sm text-slate-500">
          Order not found.
        </p>
      </div>
    )
  }

  const canCancel = CANCELLABLE_STATUSES.includes(order.status)

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <BackButton fallbackTo="/orders" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-sm text-slate-500">
            Placed on {format(new Date(order.placedAt), "PPP p")}
          </p>
        </div>
        <Badge>{order.status.replace("_", " ")}</Badge>
      </div>

      <section className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Items</h2>
        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span className="text-slate-700">
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium text-slate-900">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Shipping Address
        </h2>
        <p className="text-sm text-slate-600">
          {order.shippingAddress.addressLine1}
          {order.shippingAddress.addressLine2
            ? `, ${order.shippingAddress.addressLine2}`
            : ""}
          <br />
          {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
          {order.shippingAddress.country} - {order.shippingAddress.pincode}
        </p>
      </section>

      <section className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Order Total
        </h2>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatPrice(order.pricing.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Discount</span>
            <span>-{formatPrice(order.pricing.discount)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span>{formatPrice(order.pricing.shipping)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>{formatPrice(order.pricing.tax)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(order.pricing.total)}</span>
          </div>
        </div>
      </section>

      {order.cancelReason && (
        <p className="mb-6 text-sm text-slate-500">
          Cancellation reason: {order.cancelReason}
        </p>
      )}

      <div className="flex gap-3">
        {canCancel && (
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
              Cancel Order
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will cancel your order and restock the items. This
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Order</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isCancelling}
                  onClick={() => {
                    cancelOrder(
                      { id: order._id },
                      { onSuccess: () => setConfirmOpen(false) }
                    )
                  }}
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel Order"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}

export default OrderDetailPage
