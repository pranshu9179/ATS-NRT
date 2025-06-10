// import { ROUTES } from "@/utils";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   return <div onClick={() => navigate(ROUTES?.DASHBOARD)}>login</div>;
// }

import { useLayout } from "@/providers/LayoutProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Alert from "@/components/alert/Alert";
import { ROUTES } from "@/utils";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
  });

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    localStorage.setItem("token", JSON.stringify(values));
    const savedUser = JSON.parse(localStorage.getItem("token"));
    console.log(savedUser, "values");

    if (
      !savedUser ||
      savedUser.email !== values.email ||
      savedUser.password !== values.password
    ) {
      setStatus("The login details are incorrect");
      setLoading(false);
      return;
    }

    navigate(ROUTES?.DASHBOARD);
    setLoading(false);
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.loggedIn) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300  px-4 py-8 sm:py-10">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gray-200 shadow-lg rounded-2xl p-6 sm:p-8 border">
        <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Welcome back
            </h2>
          </div>

          {/* Alert */}
          {status && <Alert variant="danger">{status}</Alert>}

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm sm:text-base ">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className={clsx({ "border-red-500": errors.email })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Password
              </Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters",
                  },
                })}
                className={clsx("pr-10", {
                  "border-red-500": errors.password,
                })}
              />
              <button
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            <Link
              to={
                currentLayout?.name === "auth-branded"
                  ? "/auth/reset-password"
                  : "/auth/classic/reset-password"
              }
              className="text-xs sm:text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full py-2 text-sm sm:text-base"
            disabled={loading || isSubmitting}
          >
            {loading ? "Please wait..." : "Sign In"}
          </Button>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to={
                  currentLayout?.name === "auth-branded"
                    ? "/auth/signup"
                    : "/auth/classic/signup"
                }
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
