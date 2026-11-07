import { Formik, Form } from "formik"
import * as Yup from "yup"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import TextField from "@/common/forms/TextField"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/store/useAuthStore"
import {
  useCreateAddress,
  useUpdateAddress,
} from "@/modules/address/hooks/useAddresses"
import type { Address, AddressType } from "@/services/address.service"

type AddressFormValues = {
  type: AddressType
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  pincode: string
  isDefault: boolean
}

const validationSchema = Yup.object({
  type: Yup.string().oneOf(["HOME", "OFFICE", "WAREHOUSE"]).required(),
  addressLine1: Yup.string().required("Address line 1 is required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
})

const AddressFormDialog = ({
  open,
  onOpenChange,
  address,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  address?: Address
}) => {
  const userId = useAuthStore((state) => state.user?.id)
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress()
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress()

  const isEditing = !!address
  const isPending = isCreating || isUpdating

  const initialValues: AddressFormValues = {
    type: address?.type ?? "HOME",
    addressLine1: address?.addressLine1 ?? "",
    addressLine2: address?.addressLine2 ?? "",
    city: address?.city ?? "",
    state: address?.state ?? "",
    country: address?.country ?? "India",
    pincode: address?.pincode ?? "",
    isDefault: address?.isDefault ?? false,
  }

  const handleSubmit = (values: AddressFormValues) => {
    const onDone = () => onOpenChange(false)

    if (isEditing) {
      updateAddress({ id: address._id, ...values }, { onSuccess: onDone })
    } else if (userId) {
      createAddress({ userId, ...values }, { onSuccess: onDone })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Address" : "Add Address"}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="type">Address Type</Label>
                <select
                  id="type"
                  value={values.type}
                  onChange={(event) =>
                    setFieldValue("type", event.target.value as AddressType)
                  }
                  className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="HOME">Home</option>
                  <option value="OFFICE">Office</option>
                  <option value="WAREHOUSE">Warehouse</option>
                </select>
              </div>

              <TextField name="addressLine1" label="Address Line 1" />
              <TextField name="addressLine2" label="Address Line 2 (optional)" />

              <div className="grid grid-cols-2 gap-3">
                <TextField name="city" label="City" />
                <TextField name="state" label="State" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <TextField name="country" label="Country" />
                <TextField name="pincode" label="Pincode" />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={values.isDefault}
                  onChange={(event) =>
                    setFieldValue("isDefault", event.target.checked)
                  }
                />
                Set as default address
              </label>

              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Address"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddressFormDialog
