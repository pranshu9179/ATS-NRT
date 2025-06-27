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
import { useMutation } from "@apollo/client";
import { LoginApi } from "@/Api/Mutation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(""); // <-- added for feedback
  const navigate = useNavigate();
  const [loginUser, { data, loading, error }] = useMutation(LoginApi);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setStatus("");

    try {
      const { data } = await loginUser({
        variables: {
          email: "nrt@gmail.com", // or use formData.email
          password: "newrise123", // or use formData.password
        },
      });

      // Check if login data exists
      if (data?.login?.token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("user", JSON.stringify(data.login.user));

        navigate("/dashboard");
      } else {
        setStatus("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setStatus("Login failed. Server error.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border border-black/10 rounded-md p-10 w-96"
        >
          <div className="flex items-center justify-center gap-1">
            <User className=" text-cyan-400 text-3xl" />
            <h2 className="text-xl font-medium">Login Your Account</h2>
          </div>

          {/* Error message (only if status is set) */}
          {status && (
            <p className="text-red-500 text-sm text-center">{status}</p>
          )}

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              // pattern: {
              //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              //   message: "Please enter a valid email address",
              // },
            }}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <MdOutlineEmail className="text-gray-600" />
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
              // pattern: {
              //   value:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              //   message:
              //     "Password must be at least 8 characters, include upper/lowercase, number, and special character",
              // },
            }}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-1 items-center">
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
              hover:scale-105 duration-700 transition-transform 
              hover:from-cyan-400 hover:to-blue-500 shadow hover:shadow-lg"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Login;

// import { ROUTES } from "@/utils";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
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
// import { User } from "lucide-react";
// import { MdOutlineEmail } from "react-icons/md";
// import { IoLockClosedOutline } from "react-icons/io5";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Form data:", data);

//     // ✅ Set login session in localStorage
//     localStorage.setItem("isLoggedIn", "true");

//     form.reset();

//     // ✅ Force full reload so ProtectedRoute reads updated localStorage
//     window.location.href = ROUTES?.DASHBOARD;
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 border border-black/10 rounded-md p-10 w-96"
//         >
//           <div className="flex items-center justify-center gap-1">
//             <User className=" text-cyan-400 text-3xl" />
//             <h2 className="text-xl font-medium">Login Your Account</h2>
//           </div>

//           <FormField
//             control={form.control}
//             name="email"
//             rules={{
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Please enter a valid email address",
//               },
//             }}
//             render={({ field }) => (
//               <FormItem className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-1">
//                     <MdOutlineEmail className="text-gray-600" />
//                     <FormLabel>Email</FormLabel>
//                   </div>
//                   <FormControl>
//                     <Input placeholder="Enter your email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </div>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="password"
//             rules={{
//               required: "Password is required",
//               pattern: {
//                 value:
//                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                 message:
//                   "Password must be at least 8 characters, include upper/lowercase, number, and special character",
//               },
//             }}
//             render={({ field }) => (
//               <FormItem className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex gap-1 items-center">
//                     <IoLockClosedOutline />
//                     <FormLabel>Password</FormLabel>
//                   </div>
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
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <FiEyeOff /> : <FiEye />}
//                     </div>
//                   </div>
//                   <FormMessage />
//                 </div>
//               </FormItem>
//             )}
//           />

//           <Button
//             className="w-full py-2 font-semibold text-sm bg-gradient-to-r
//               from-blue-500 to-cyan-400
//               hover:scale-105 duration-700 transition-transform
//               hover:from-cyan-400 hover:to-blue-500 shadow hover:shadow-lg"
//             type="submit"
//           >
//             Login
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
