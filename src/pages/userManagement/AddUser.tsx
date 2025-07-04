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
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLayout } from "@/providers/LayoutProvider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMutation } from "@apollo/client";
import { CreateUser } from "@/Api/Mutation";

const roleMap = {
  HR: 1,
  INTERVIEWER: 2,
  ADMIN: 3,
};

function getRoleIdFromLabel(role) {
  return roleMap[role] || 0;
}

const roles = [
  { label: "HR", value: "HR" },
  { label: "Interviewer", value: "INTERVIEWER" },
  { label: "Admin", value: "ADMIN" },
];

const AddUser = ({ setOpen, refetchUsers }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNo: "",
      role: "",
    },
  });

  const { handleSubmit } = form;

  const [addUserMutation] = useMutation(CreateUser);

  const onSubmit = async (data) => {
    const { name, email, password, role, phoneNo } = data;
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || " ";

    setLoading(true);
    try {
      console.log("🔄 Creating user...");
      const response = await addUserMutation({
        variables: {
          firstName,
          lastName,
          email,
          password,
          roleIds: [getRoleIdFromLabel(role)],
          mobileNo: phoneNo,
          userType: role,
        },
        
      });
      console.log("response",response);

      console.log("✅ User created:", response.data);
      // alert("User created successfully");

      if (refetchUsers) {
        await refetchUsers();
        console.log("✅ User list refetched");
      }

      setOpen(false);
    } catch (error) {
      console.error("❌ User creation failed:", error.message);
      alert("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-5xl light:border-black/10 rounded-md w-full space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 gap-y-4 place-content-center w-full">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <LuUser />
                      <FormLabel className={undefined}>Name</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage className={undefined} />
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
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <MdOutlineEmail />
                      <FormLabel className={undefined}>Email</FormLabel>
                    </div>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </div>
                </FormItem>
              )}
            />

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
                      <FormLabel className={undefined}>Phone No.</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-1 items-center">
                      <IoLockClosedOutline />
                      <FormLabel className={undefined}>Password</FormLabel>
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
                    <FormMessage className={undefined} />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === form.watch("password") ||
                  "Passwords do not match",
              }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-1 items-center">
                      <IoLockClosedOutline />
                      <FormLabel className={undefined}>Confirm Password</FormLabel>
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
                    <FormMessage className={undefined} />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-1 items-center">
                      <LuUser />
                      <FormLabel className={undefined}>Role</FormLabel>
                    </div>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[224px]">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className={undefined} >
                          {roles.map((role) => (
                            <SelectItem
                              key={role.value}
                              value={role.value} className={undefined}                             >
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={undefined} />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full py-2 font-semibold text-sm bg-black text-white hover:scale-105 duration-700 transition-transform shadow hover:shadow-lg"
            type="submit"
            disabled={loading} variant={undefined} size={undefined}          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddUser;
