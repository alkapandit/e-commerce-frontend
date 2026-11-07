import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import { Heart } from "lucide-react"
import * as Yup from "yup"

import SocialLoginButtons from "@/common/buttons/SocialLoginButtons"
import TextField from "@/common/forms/TextField"
import PasswordField from "@/common/forms/PasswordField"
import useRegister from "@/auth/hooks/useRegister"
import type { RegisterPayload } from "@/auth/types/auth.types"

type RegisterValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  userType: RegisterPayload["userType"]
}

const initialValues: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  userType: "buyer",
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const RegisterPage = () => {
  const { mutate: registerUser, isPending } = useRegister()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Heart className="size-5" />
          Hi, keep track of your favorites!
        </div>
        <p className="text-sm text-slate-500">Create your account.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => registerUser(values)}
      >
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <TextField
              boxed
              name="firstName"
              label="First Name"
              placeholder="First name"
            />
            <TextField
              boxed
              name="lastName"
              label="Last Name"
              placeholder="Last name"
            />
          </div>

          <TextField
            boxed
            name="email"
            type="email"
            label="Email Address"
            placeholder="your@email.com"
          />

          <TextField
            boxed
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="9876543210"
          />

          <PasswordField name="password" />

          <button
            type="submit"
            disabled={isPending}
            className="h-11 rounded-md bg-slate-900 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </button>
        </Form>
      </Formik>

      <SocialLoginButtons />

      <Link
        to="/login"
        className="flex items-center justify-center gap-1 text-sm font-medium text-slate-700 hover:underline"
      >
        Already have an account? Sign In
        <span aria-hidden>›</span>
      </Link>
    </div>
  )
}

export default RegisterPage
