import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import { Heart } from "lucide-react"
import * as Yup from "yup"

import SocialLoginButtons from "@/common/buttons/SocialLoginButtons"
import TextField from "@/common/forms/TextField"
import PasswordField from "@/common/forms/PasswordField"

type LoginValues = {
  email: string
  password: string
}

const initialValues: LoginValues = {
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Heart className="size-5" />
          Hi, keep track of your favorites!
        </div>
        <p className="text-sm text-slate-500">Please sign in.</p>
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
            boxed
            name="email"
            type="email"
            label="Email Address"
            placeholder="your@email.com"
          />

          <div>
            <PasswordField name="password" />
            <div className="mt-1.5 text-right">
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-slate-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="h-11 rounded-md bg-slate-900 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Sign In
          </button>
        </Form>
      </Formik>

      <SocialLoginButtons />

      <Link
        to="/register"
        className="flex items-center justify-center gap-1 text-sm font-medium text-slate-700 hover:underline"
      >
        Create an Account
        <span aria-hidden>›</span>
      </Link>
    </div>
  )
}

export default LoginPage
