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
// import { Link, useNavigate, useLocation } from "react-router-dom";
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

// const AddUser = ({ setOpen }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCPassword, setShowCPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { currentLayout } = useLayout();
//   const navigate = useNavigate();

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phoneNo: "",
//       role: "",
//     },
//   });

//   const { handleSubmit } = form;

//   const onSubmit = async (data) => {
//     const { name, email, password, confirmPassword, role, phoneNo } = data;
//     console.log(data);

//     setLoading(true);
//     alert("User created successfully");

//     setOpen(false);
//   };

//   return (
//     <>
//       {/* Create user Form */}
//       <div className="flex justify-center items-center ">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="  max-w-5xl
//             light:border-black/10 rounded-md
//             w-full space-y-8 "
//           >
//             <div className="grid grid-cols-2 gap-3 gap-y-4 place-content-center w-full">
//               {/* name */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 rules={{ required: "Name is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-1">
//                         <LuUser />
//                         <FormLabel>Name</FormLabel>
//                       </div>
//                       <FormControl>
//                         <Input placeholder="Enter your name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 rules={{
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Enter a valid email address",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-1">
//                         <MdOutlineEmail />
//                         <FormLabel>Email</FormLabel>
//                       </div>
//                       <FormControl>
//                         <Input placeholder="Enter your email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* phone number */}
//               <FormField
//                 control={form.control}
//                 name="phoneNo"
//                 rules={{
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Phone number must be 10 digits",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-1">
//                         <MdPhone />
//                         <FormLabel>Phone No.</FormLabel>
//                       </div>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="Enter your phone number"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 rules={{ required: "Password is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex gap-1 items-center">
//                         <IoLockClosedOutline />
//                         <FormLabel>Password</FormLabel>
//                       </div>
//                       <div className="relative">
//                         <FormControl>
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter password"
//                             {...field}
//                           />
//                         </FormControl>
//                         <div
//                           className="absolute right-3 top-2.5 cursor-pointer"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? <FiEyeOff /> : <FiEye />}
//                         </div>
//                       </div>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* confirm password */}
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 rules={{
//                   required: "Confirm Password is required",
//                   validate: (value) =>
//                     value === form.watch("password") ||
//                     "Passwords do not match",
//                 }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex gap-1 items-center">
//                         <IoLockClosedOutline />
//                         <FormLabel>Confirm Password</FormLabel>
//                       </div>
//                       <div className="relative">
//                         <FormControl>
//                           <Input
//                             type={showCPassword ? "text" : "password"}
//                             placeholder="Re-enter password"
//                             {...field}
//                           />
//                         </FormControl>
//                         <div
//                           className="absolute right-3 top-2.5 cursor-pointer"
//                           onClick={() => setShowCPassword(!showCPassword)}
//                         >
//                           {showCPassword ? <FiEyeOff /> : <FiEye />}
//                         </div>
//                       </div>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* Role */}
//               <FormField
//                 control={form.control}
//                 name="role"
//                 rules={{ required: "Role is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                      <div className="flex gap-1 items-center">
//                        <LuUser />
//                       <FormLabel>Role</FormLabel>
//                      </div>
//                       <FormControl>
//                         <Select
//                           value={field.value}
//                           onValueChange={field.onChange}
//                           className="w-full"
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
//             </div>

//             {/* Submit */}
//             <Button
//               className="w-full py-2 font-semibold text-sm bg-black text-white
//                 hover:scale-105 duration-700
//                 transition-transform shadow hover:shadow-lg"
//               type="submit"
//             >
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default AddUser;

import React, { useState,useEffect } from "react";
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
import { FiUserPlus } from "react-icons/fi";

const roles = [
  { label: "HR", value: "HR" },
  { label: "Interviewer", value: "Interviewer" },
  { label: "Admin", value: "Admin" },
];

const AddUser = ({ setOpen, selectedUser }) => {
  console.log("selectedUserdata", selectedUser);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNo: "",
      role: "",
    },
  });

  const { handleSubmit, setValue } = form;

 if (selectedUser?.id) {
  setValue("firstName", selectedUser?.firstName);
  setValue("lastName", selectedUser?.lastName);
  setValue("email", selectedUser?.email);
  setValue("password", selectedUser?.password);
  setValue("mobileNo", selectedUser?.mobileNo);
  setValue("role", selectedUser?.role);
}

useEffect(() => {
  if (selectedUser?.id) {
    form.reset({
      firstName: selectedUser.firstName || "",
      lastName: selectedUser.lastName || "",
      email: selectedUser.email || "",
      password: selectedUser.password || "",
      mobileNo: selectedUser.mobileNo || "",
      role: selectedUser.role || "",
    });
  }
}, [selectedUser, form]);

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, role, mobileNo } = data;
    console.log(data);

    setLoading(true);
    alert("User created successfully");

    setOpen(false);
  };

  return (
    <>
      {/* Create user Form */}
      <div className="flex flex-col gap-6">
        {
          selectedUser ? 
          (<div className="flex gap-2 items-center">
          <FiUserPlus className="text-xl" />
          <h3 className="text-xl font-semibold">Edit User</h3>
        </div>) :(
          <div className="flex gap-2 items-center">
          <FiUserPlus className="text-xl" />
          <h3 className="text-xl font-semibold">Create User</h3>
        </div>
        )
        }
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-5xl light:border-black/10 rounded-md w-full space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 gap-y-4 place-content-center w-full">
              {/* Fistname */}
              <FormField
                control={form.control}
                name="firstName"
                rules={{ required: "FirstName is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <LuUser />
                        <FormLabel>FirstName</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter your firstName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Lastname */}
              <FormField
                control={form.control}
                name="lastName"
                rules={{ required: "LastName is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <LuUser />
                        <FormLabel>LastName</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter your lastName" {...field} />
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

              {/* password */}
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password is required" }}
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

              {/* phone number */}
              <FormField
                control={form.control}
                name="mobileNo"
                rules={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <MdPhone />
                        <FormLabel>Mobile No.</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-1 items-center">
                        <LuUser />
                        <FormLabel>Role</FormLabel>
                      </div>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          className="w-full"
                        >
                          <SelectTrigger className="w-[224px]">
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
            </div>

            {/* Submit */}
            <Button
              className="w-full py-2 font-semibold text-sm bg-black text-white hover:scale-105 duration-700 transition-transform shadow hover:shadow-lg"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
