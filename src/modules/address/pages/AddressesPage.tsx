import { useState } from "react"
import { MapPin, Pencil, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import BackButton from "@/common/components/BackButton"
import { useAddresses, useDeleteAddress } from "@/modules/address/hooks/useAddresses"
import AddressFormDialog from "@/modules/address/components/AddressFormDialog"
import type { Address } from "@/services/address.service"

const AddressesPage = () => {
  const { data: addresses, isLoading } = useAddresses()
  const { mutate: deleteAddress } = useDeleteAddress()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | undefined>()

  const openCreateDialog = () => {
    setEditingAddress(undefined)
    setDialogOpen(true)
  }

  const openEditDialog = (address: Address) => {
    setEditingAddress(address)
    setDialogOpen(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <BackButton fallbackTo="/account" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Your Addresses</h1>
        <Button onClick={openCreateDialog}>Add Address</Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : !addresses || addresses.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <MapPin className="size-10 text-slate-300" />
          <p className="text-sm text-slate-500">You have no saved addresses yet.</p>
          <Button onClick={openCreateDialog}>Add Your First Address</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="flex items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="secondary">{address.type}</Badge>
                  {address.isDefault && (
                    <span className="flex items-center gap-1 text-xs font-medium text-blue-600">
                      <Star className="size-3 fill-blue-600" />
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-800">
                  {address.addressLine1}
                  {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                </p>
                <p className="text-sm text-slate-500">
                  {address.city}, {address.state}, {address.country} -{" "}
                  {address.pincode}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Edit address"
                  onClick={() => openEditDialog(address)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  aria-label="Delete address"
                  onClick={() => deleteAddress(address._id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        address={editingAddress}
      />
    </div>
  )
}

export default AddressesPage
