// import { ROUTES } from "@/utils";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   return <div onClick={() => navigate(ROUTES?.DASHBOARD)}>login</div>;
// }

// import { useLayout } from "@/providers/LayoutProvider";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import clsx from "clsx";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// // import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import Alert from "@/components/alert/Alert";
// import { ROUTES } from "@/utils";

// const initialValues = {
//   email: "",
//   password: "",
//   remember: false,
// };

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { currentLayout } = useLayout();
//   const [status, setStatus] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";

//   const {
//     handleSubmit,
//     register,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: initialValues,
//   });

//   const togglePassword = (e) => {
//     e.preventDefault();
//     setShowPassword(!showPassword);
//   };

//   const onSubmit = handleSubmit(async (values) => {
//     setLoading(true);
//     localStorage.setItem("token", JSON.stringify(values));
//     const savedUser = JSON.parse(localStorage.getItem("token"));
//     console.log(savedUser, "values");

//     if (
      // !savedUser ||
//       savedUser.email !== values.email ||
//       savedUser.password !== values.password
//     ) {
//       setStatus("The login details are incorrect");
//       setLoading(false);
//       return;
//     }

//     navigate(ROUTES?.DASHBOARD);
//     setLoading(false);
//   });

//   useEffect(() => {
//     const auth = JSON.parse(localStorage.getItem("auth"));
//     if (auth?.loggedIn) {
//       navigate(from, { replace: true });
//     }
//   }, [from, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-300  px-4 py-8 sm:py-10">
//       <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gray-200 shadow-lg rounded-2xl p-6 sm:p-8 border">
//         <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
//           {/* Header */}
//           <div className="text-center">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Welcome back
//             </h2>
//           </div>

//           {/* Alert */}
//           {status && <Alert variant="danger">{status}</Alert>}

//           {/* Email */}
//           <div className="space-y-1">
//             <Label htmlFor="email" className="text-sm sm:text-base ">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="Enter your email"
//               autoComplete="off"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: "Invalid email format",
//                 },
//               })}
//               className={clsx({ "border-red-500": errors.email })}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="space-y-1">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="password" className="text-sm sm:text-base">
//                 Password
//               </Label>
//             </div>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 autoComplete="off"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 3,
//                     message: "Minimum 3 characters",
//                   },
//                   maxLength: {
//                     value: 50,
//                     message: "Maximum 50 characters",
//                   },
//                 })}
//                 className={clsx("pr-10", {
//                   "border-red-500": errors.password,
//                 })}
//               />
//               <button
//                 onClick={togglePassword}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 type="button"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//             <Link
//               to={
//                 currentLayout?.name === "auth-branded"
//                   ? "/auth/reset-password"
//                   : "/auth/classic/reset-password"
//               }
//               className="text-xs sm:text-sm text-blue-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit */}
//           <Button
//             type="submit"
//             className="w-full py-2 text-sm sm:text-base"
//             disabled={loading || isSubmitting}
//           >
//             {loading ? "Please wait..." : "Sign In"}
//           </Button>
//           <div className="text-center">
//             <p className="text-xs sm:text-sm text-muted-foreground">
//               Don’t have an account?{" "}
//               <Link
//                 to={
//                   currentLayout?.name === "auth-branded"
//                     ? "/auth/signup"
//                     : "/auth/classic/signup"
//                 }
//                 className="text-blue-600 hover:underline"
//               >
//                 Register
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { ROUTES } from "@/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // alert("Login successfully");
    form.reset();
    navigate(ROUTES?.DASHBOARD);
  };

  return (
    <div className="flex justify-center items-center  ">
      <Form {...form} className=" ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border border-black/10 rounded-md p-10 w-96  "
        >
          <div className="flex items-center justify-center gap-1">
            <User className=" text-cyan-400 text-3xl" />
            <h2 className="text-xl font-medium ">Login Your Account</h2>
          </div>
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <MdOutlineEmail className="text-gray-600" />
                    <FormLabel>Email</FormLabel>
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters, include upper/lowercase, number, and special character",
              },
            }}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="space-y-2">
                  <div className=" flex gap-1 items-center">
                    <IoLockClosedOutline />
                    <FormLabel>Password</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <div
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            className="w-full py-2 font-semibold text-sm bg-gradient-to-r
             from-blue-500 to-cyan-400 
          hover:scale-105 duration-700  transition-transform 
          hover:from-cyan-400 hover:to-blue-500 shadow hover:shadow-lg  "
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}



// // src/pages/Login.jsx
// import { useLayout } from "@/providers/LayoutProvider";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import clsx from "clsx";
// import { ROUTES } from "@/utils";
// import Alert from "@/components/alert/Alert";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { MdOutlineEmail } from "react-icons/md";
// import { IoLockClosedOutline } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedin } from "react-icons/fa";

// // Firebase Google OAuth Stub (You will implement it later)
// const signInWithGoogle = async () => {
//   return {
//     email: "admin@example.com",
//     role: "super admin", // Default role for now
//   };
// };

// const initialValues = {
//   email: "",
//   password: "",
//   remember: false,
// };

// export default function Login() {
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [status, setStatus] = useState(null);
//   const { currentLayout } = useLayout();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || ROUTES?.DASHBOARD;

//   const form = useForm({ defaultValues: initialValues });

//   const togglePassword = (e) => {
//     e.preventDefault();
//     setShowPassword(!showPassword);
//   };

//   const onSubmit = form.handleSubmit(async (values) => {
//     setLoading(true);
//     localStorage.setItem("token", JSON.stringify(values));
//     const savedUser = JSON.parse(localStorage.getItem("token"));

//     if (
//       !savedUser ||
//       savedUser.email !== values.email ||
//       savedUser.password !== values.password
//     ) {
//       setStatus("The login details are incorrect");
//       setLoading(false);
//       return;
//     }

//     navigate("/superadmin/dashboard"); // Super Admin default
//     setLoading(false);
//   });

//   useEffect(() => {
//     const auth = JSON.parse(localStorage.getItem("auth"));
//     if (auth?.loggedIn) {
//       navigate(from, { replace: true });
//     }
//   }, [from, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Login to Your Account
//           </h2>
//         </div>

//         {status && <Alert variant="danger">{status}</Alert>}

//         <Form {...form}>
//           <form onSubmit={onSubmit} className="space-y-5">
//             <FormField
//               control={form.control}
//               name="email"
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: "Invalid email format",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <MdOutlineEmail /> Email
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       className={clsx({ "border-red-500": form.formState.errors.email })}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               rules={{
//                 required: "Password is required",
//                 minLength: {
//                   value: 3,
//                   message: "Minimum 3 characters",
//                 },
//                 maxLength: {
//                   value: 50,
//                   message: "Maximum 50 characters",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <IoLockClosedOutline /> Password
//                   </FormLabel>
//                   <div className="relative">
//                     <FormControl>
//                       <Input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter your password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <div
//                       className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                       onClick={togglePassword}
//                     >
//                       {showPassword ? <FiEyeOff /> : <FiEye />}
//                     </div>
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="text-right">
//               <Link
//                 to={
//                   currentLayout?.name === "auth-branded"
//                     ? "/auth/reset-password"
//                     : "/auth/classic/reset-password"
//                 }
//                 className="text-xs text-blue-600 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             <Button
//               type="submit"
//               className="w-full py-2 font-semibold text-sm bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105 duration-700 hover:from-cyan-400 hover:to-blue-500 shadow-md"
//               disabled={loading || form.formState.isSubmitting}
//             >
//               {loading ? "Please wait..." : "Login"}
//             </Button>

//             {/* Social Logins */}
//             <div className="flex flex-col gap-3 mt-2">
//               <Button
//                 variant="outline"
//                 onClick={async () => {
//                   try {
//                     const user = await signInWithGoogle();
//                     localStorage.setItem("token", JSON.stringify(user));
//                     navigate("/superadmin/dashboard");
//                   } catch (err) {
//                     setStatus("Google login failed.");
//                   }
//                 }}
//                 className="w-full flex items-center justify-center gap-2 text-sm"
//               >
//                 <FcGoogle size={18} />
//                 Login with Google
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 text-sm text-blue-700"
//                 disabled
//               >
//                 <FaLinkedin size={18} />
//                 Login with LinkedIn (Coming soon)
//               </Button>
//             </div>

//             {/* Register Link */}
//             <div className="text-center text-sm mt-4">
//               Don’t have an account?{" "}
//               <Link
//                 to={
//                   currentLayout?.name === "auth-branded"
//                     ? "/auth/signup"
//                     : "/auth/classic/signup"
//                 }
//                 className="text-blue-600 hover:underline"
//               >
//                 Register
//               </Link>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
