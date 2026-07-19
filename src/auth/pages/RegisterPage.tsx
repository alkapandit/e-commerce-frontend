import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import { Heart } from "lucide-react"
import * as Yup from "yup"

import SocialLoginButtons from "@/common/buttons/SocialLoginButtons"
import TextField from "@/common/forms/TextField"
import PasswordField from "@/common/forms/PasswordField"

type RegisterValues = {
  fullName: string
  email: string
  password: string
}

const initialValues: RegisterValues = {
  fullName: "",
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
})

const RegisterPage = () => {
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
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form className="flex flex-col gap-4">
          <TextField
            name="fullName"
            label="Full Name"
            placeholder="Your name"
          />

          <TextField
            boxed
            name="email"
            type="email"
            label="Email Address"
            placeholder="your@email.com"
          />

          <PasswordField name="password" />

          <button
            type="submit"
            className="h-11 rounded-md bg-slate-900 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Create Account
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
