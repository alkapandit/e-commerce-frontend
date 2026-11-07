import { Formik, Form } from "formik"
import * as Yup from "yup"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/common/components/BackButton"
import TextField from "@/common/forms/TextField"
import { useProfile, useUpdateProfile } from "@/modules/account/hooks/useProfile"

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().matches(/^[6-9]\d{9}$/, "Enter a valid phone number"),
})

const AccountPage = () => {
  const { data: profile, isLoading } = useProfile()
  const { mutate: updateProfile, isPending } = useUpdateProfile()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg px-6 py-8">
        <BackButton fallbackTo="/" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="mx-auto max-w-lg px-6 py-8">
      <BackButton fallbackTo="/" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900">My Profile</h1>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm text-slate-500">
          Email: <span className="font-medium text-slate-800">{profile.email}</span>
          {!profile.isEmailVerified && (
            <span className="ml-2 text-xs text-amber-600">(unverified)</span>
          )}
        </p>

        <Formik
          initialValues={{
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            phone: profile.phone ?? "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => updateProfile(values)}
        >
          <Form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <TextField name="firstName" label="First Name" />
              <TextField name="lastName" label="Last Name" />
            </div>
            <TextField name="phone" label="Phone Number" />

            <Button type="submit" disabled={isPending} className="self-start">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AccountPage
