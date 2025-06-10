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

export default function Register({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    alert("Register successfully");
    form.reset();
    setIsLogin(true);
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
            <h2 className="text-xl font-medium ">Create Your Account</h2>
          </div>

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
                    <Input
                      placeholder="Enter your name"
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

          <FormField
            control={form.control}
            name="cpassword"
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === form.watch("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="space-y-2">
                  <div className=" flex gap-1 items-center">
                    <IoLockClosedOutline />
                    <FormLabel>Confirm Password</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showCPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <div
                      className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
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

          <Button
            className="w-full py-2 font-semibold text-sm bg-gradient-to-r
             from-blue-500 to-cyan-400 
          hover:scale-105 duration-700  transition-transform 
          hover:from-cyan-400 hover:to-blue-500 shadow hover:shadow-lg  "
            type="submit"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
