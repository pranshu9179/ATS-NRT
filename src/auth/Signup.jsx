// import React, { useState } from "react";
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
// import { LuUser } from "react-icons/lu";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useLayout } from "@/providers/LayoutProvider";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { MdPhone } from "react-icons/md";

// const roles = [
//   { label: "HR", value: "HR" },
//   { label: "Interviewer", value: "INTERVIEWER" },
//   { label: "Admin", value: "ADMIN" },
// ];

//  const Signup=({ setIsLogin })=> {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCPassword, setShowCPassword] = useState(false);
//   const [emailOtp, setEmailOtp] = useState(Array(6).fill(""));
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { currentLayout } = useLayout();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isSuperAdmin = currentLayout?.name === "superadmin-layout";
//   const from = location.state?.from?.pathname || "/";
//   const [isOTPSent, setIsOTPSent] = useState(false);

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       organizationName: "",
//       role: "HR",
//       acceptTerms: false,
//       phoneNo: "",
//     },
//   });

//   const { handleSubmit } = form;

//   const onSubmit = async (data) => {
//     const {
//       name,
//       email,
//       password,
//       confirmPassword,
//       organizationName,
//       role,
//       acceptTerms,
//       phoneNo,
//     } = data;

//     console.log(
//       name,
//       email,
//       password,
//       confirmPassword,
//       organizationName,
//       role,
//       acceptTerms,
//       phoneNo
//     );

//     setLoading(true);

//     try {
//       if (isSuperAdmin) {
//         const user = { name, email, org: organizationName, role };
//         localStorage.setItem(`user_${email}`, JSON.stringify(user));
//         alert("User created successfully");
//         navigate(from, { replace: true });
//         return;
//       }

//       if (!isOTPSent) {
//         setIsOTPSent(true);
//         setOpen(true);
//         alert("OTP sent (simulated)");
//         return;
//       }

//       const fullOtp = emailOtp.join("");
//       if (fullOtp.length !== 6) return alert("OTP must be 6 digits");

//       const user = {
//         name,
//         email,
//         password,
//         org: organizationName,
//         otp: fullOtp,
//         role: "CANDIDATE",
//       };
//       localStorage.setItem(`user_${email}`, JSON.stringify(user));
//       alert("Registered successfully");
//       setOpen(false);
//       navigate(from, { replace: true });
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleInputChange = (index, value) => {
//     if (value.length > 1) return;
//     const updated = [...emailOtp];
//     updated[index] = value;
//     setEmailOtp(updated);
//     if (index < 5 && value) {
//       document.getElementById(`otp-index-${index + 1}`)?.focus();
//     }
//   };

//   return (
//     <>
//       {/* OTP Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="w-full max-w-sm rounded-xl px-6 py-8 shadow-2xl">
//           <h3 className="text-xl font-bold text-center mb-6 ">Enter OTP</h3>
//           <div className="flex justify-center gap-3 mb-6">
//             {emailOtp.map((value, index) => (
//               <input
//                 key={index}
//                 id={`otp-index-${index}`}
//                 type="text"
//                 maxLength={1}
//                 autoFocus={index === 0}
//                 className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg
//                  font-semibold border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={value}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Backspace" && !value && index > 0) {
//                     document.getElementById(`otp-index-${index - 1}`)?.focus();
//                   }
//                 }}
//               />
//             ))}
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={handleSubmit(onSubmit)}
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold shadow-md transition"
//             >
//               {loading ? "Verifying..." : "Verify & Register"}
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Register Form */}
//       <div className="flex justify-center items-center  ">
//         <Form {...form} className=" ">
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 border dark:border-white/20 light:border-black/10 rounded-md p-10 w-96  "
//           >
//             <div className="flex items-center justify-center gap-1">
//               <User className=" text-cyan-400 text-3xl" />
//               <h2 className="text-xl font-medium ">Create Your Account</h2>
//             </div>

//             <FormField
//               control={form.control}
//               name="name"
//               rules={{ required: "Name is required" }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-1">
//                       <LuUser />
//                       <FormLabel>Name</FormLabel>
//                     </div>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your name"
//                         {...field}
//                         className=""
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Please enter a valid email address",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-1">
//                       <MdOutlineEmail className="" />
//                       <FormLabel>Email</FormLabel>
//                     </div>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your email"
//                         {...field}
//                         className=""
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phoneNo"
//               rules={{
//                 required: "Phone number is required",
//                 pattern: {
//                   value: /^[0-9]{10}$/, 
//                   message: "Phone number must be 10 digits",
//                 },
//               }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-1">
//                       <MdPhone />
//                       <FormLabel>Phone No.</FormLabel>
//                     </div>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your phone number"
//                         {...field}
//                         className=""
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* Organization */}
//             {isSuperAdmin && (
//               <FormField
//                 control={form.control}
//                 name="organizationName"
//                 rules={{ required: "organizationName is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-1">
//                         <FormLabel>Oraganization Name</FormLabel>
//                       </div>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter Organization name"
//                           {...field}
//                           className=""
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             )}

//             {isSuperAdmin && (
//               <FormField
//                 control={form.control}
//                 name="role"
//                 rules={{ required: "Role is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-1">
//                         <LuUser />
//                         <FormLabel>Role</FormLabel>
//                       </div>
//                       <FormControl>
//                         <Select
//                           value={field.value}
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select Role" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {roles.map((role) => (
//                               <SelectItem key={role.value} value={role.value}>
//                                 {role.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             )}

//             <FormField
//               control={form.control}
//               name="password"
//               rules={{
//                 required: "Password is required",
//                 // pattern: {
//                 //   value:
//                 //     /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
//                 //   message:
//                 //     "Password must be at least 8 characters, include upper/lowercase, number, and special character",
//                 // },
//               }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <div className=" flex gap-1 items-center">
//                       <IoLockClosedOutline />
//                       <FormLabel>Password</FormLabel>
//                     </div>
//                     <div className="relative">
//                       <FormControl>
//                         <Input
//                           type={showPassword ? "text" : "password"}
//                           placeholder="Enter your password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <div
//                         className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <FiEyeOff /> : <FiEye />}
//                       </div>
//                     </div>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               rules={{
//                 required: "Confirm Password is required",
//                 validate: (value) =>
//                   value === form.watch("password") || "Passwords do not match",
//               }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <div className=" flex gap-1 items-center">
//                       <IoLockClosedOutline />
//                       <FormLabel>Confirm Password</FormLabel>
//                     </div>
//                     <div className="relative">
//                       <FormControl>
//                         <Input
//                           type={showCPassword ? "text" : "password"}
//                           placeholder="Enter your password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <div
//                         className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                         onClick={() => setShowCPassword(!showCPassword)}
//                       >
//                         {showCPassword ? <FiEyeOff /> : <FiEye />}
//                       </div>
//                     </div>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="acceptTerms"
//               rules={{ required: "You must accept the terms and conditions" }}
//               render={({ field }) => (
//                 <FormItem className="flex items-start space-x-3 space-y-0">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       id="terms"
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel
//                       htmlFor="terms"
//                       className="text-sm text-gray-600"
//                     >
//                       I accept the{" "}
//                       <Link to="#" className="text-blue-600 underline">
//                         Terms & Conditions
//                       </Link>
//                     </FormLabel>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <Button
//               className="w-full py-2 font-semibold text-sm bg-gradient-to-r
//              from-blue-500 to-cyan-400 
//           hover:scale-105 duration-700  transition-transform 
//           hover:from-cyan-400 hover:to-blue-500 shadow hover:shadow-lg  "
//               type="submit"
//             >
//               Register
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// }
// export default Signup


// Signup.jsx
import React, { useState } from "react";
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
import { LuUser } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLayout } from "@/providers/LayoutProvider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MdPhone } from "react-icons/md";

const roles = [
  { label: "HR", value: "HR" },
  { label: "Interviewer", value: "INTERVIEWER" },
  { label: "Admin", value: "ADMIN" },
];

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [emailOtp, setEmailOtp] = useState(Array(6).fill(""));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentLayout } = useLayout();
  const navigate = useNavigate();
  const isSuperAdmin = currentLayout?.name === "superadmin-layout";
  const [isOTPSent, setIsOTPSent] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
      role: "HR",
      acceptTerms: false,
      phoneNo: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      organizationName,
      role,
      acceptTerms,
      phoneNo,
    } = data;

    setLoading(true);

    try {
      if (isSuperAdmin) {
        const user = { name, email, org: organizationName, role };
        localStorage.setItem(`user_${email}`, JSON.stringify(user));
        alert("User created successfully");
        navigate("/auth", { replace: true }); // ✅ redirect to login
        return;
      }

      if (!isOTPSent) {
        setIsOTPSent(true);
        setOpen(true);
        alert("OTP sent (simulated)");
        return;
      }

      const fullOtp = emailOtp.join("");
      if (fullOtp.length !== 6) return alert("OTP must be 6 digits");

      const user = {
        name,
        email,
        password,
        org: organizationName,
        otp: fullOtp,
        role: "CANDIDATE",
      };
      localStorage.setItem(`user_${email}`, JSON.stringify(user));
      alert("Registered successfully");
      setOpen(false);
      navigate("/auth", { replace: true }); // ✅ redirect to login
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const updated = [...emailOtp];
    updated[index] = value;
    setEmailOtp(updated);
    if (index < 5 && value) {
      document.getElementById(`otp-index-${index + 1}`)?.focus();
    }
  };

  return (
    <>
      {/* OTP Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-sm rounded-xl px-6 py-8 shadow-2xl">
          <h3 className="text-xl font-bold text-center mb-6">Enter OTP</h3>
          <div className="flex justify-center gap-3 mb-6">
            {emailOtp.map((value, index) => (
              <input
                key={index}
                id={`otp-index-${index}`}
                type="text"
                maxLength={1}
                autoFocus={index === 0}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !value && index > 0) {
                    document.getElementById(`otp-index-${index - 1}`)?.focus();
                  }
                }}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold shadow-md transition"
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Form */}
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border dark:border-white/20 light:border-black/10 rounded-md p-10 w-96"
          >
            <div className="flex items-center justify-center gap-1">
              <User className="text-cyan-400 text-3xl" />
              <h2 className="text-xl font-medium">Create Your Account</h2>
            </div>

            {/* name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <LuUser />
                      <FormLabel>Name</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <MdOutlineEmail />
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

            {/* phone number */}
            <FormField
              control={form.control}
              name="phoneNo"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <MdPhone />
                      <FormLabel>Phone No.</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* organization name */}
            {isSuperAdmin && (
              <FormField
                control={form.control}
                name="organizationName"
                rules={{ required: "Organization name is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            {/* role (only for superadmin) */}
            {isSuperAdmin && (
              <FormField
                control={form.control}
                name="role"
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <LuUser />
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <IoLockClosedOutline />
                    <FormLabel>Password</FormLabel>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className="absolute right-3 top-2.5 cursor-pointer"
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

            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === form.watch("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <IoLockClosedOutline />
                    <FormLabel>Confirm Password</FormLabel>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showCPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className="absolute right-3 top-2.5 cursor-pointer"
                        onClick={() => setShowCPassword(!showCPassword)}
                      >
                        {showCPassword ? <FiEyeOff /> : <FiEye />}
                      </div>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Terms */}
            <FormField
              control={form.control}
              name="acceptTerms"
              rules={{ required: "You must accept the terms and conditions" }}
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms" className="text-sm text-gray-600">
                      I accept the{" "}
                      <Link to="#" className="text-blue-600 underline">
                        Terms & Conditions
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              className="w-full py-2 font-semibold text-sm bg-gradient-to-r
               from-blue-500 to-cyan-400 hover:scale-105 duration-700
                transition-transform hover:from-cyan-400 hover:to-blue-500
                shadow hover:shadow-lg"
              type="submit"
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Signup;