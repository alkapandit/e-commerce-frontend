import { Link, useSearchParams } from "react-router-dom"
import { format } from "date-fns"
import { Package } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import { useOrders } from "@/modules/orders/hooks/useOrders"
import type { OrderStatus } from "@/services/order.service"

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

const statusVariant = (
  status: OrderStatus
): "default" | "secondary" | "destructive" | "outline" => {
  if (status === "DELIVERED" || status === "PAID") return "default"
  if (status === "CANCELLED" || status === "REFUNDED") return "destructive"
  if (status === "PENDING_PAYMENT") return "outline"
  return "secondary"
}

const STATUS_FILTERS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Pending Payment", value: "PENDING_PAYMENT" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
]

const OrdersListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = (searchParams.get("status") as OrderStatus | null) ?? ""

  const { data, isLoading } = useOrders({
    status: status || undefined,
    limit: 20,
  })

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <BackButton fallbackTo="/account" />
      <h1 className="mb-4 text-2xl font-bold text-slate-900">My Orders</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.label}
            onClick={() => {
              const next = new URLSearchParams(searchParams)
              if (filter.value) next.set("status", filter.value)
              else next.delete("status")
              setSearchParams(next)
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              status === filter.value
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Package className="size-10 text-slate-300" />
          <p className="text-sm text-slate-500">No orders yet.</p>
          <Button render={<Link to="/products" />}>Start Shopping</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.data.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-slate-500">
                  Placed on {format(new Date(order.placedAt), "PPP")} ·{" "}
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant(order.status)}>
                  {order.status.replace("_", " ")}
                </Badge>
                <span className="text-sm font-semibold text-slate-900">
                  {formatPrice(order.pricing.total)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersListPage
