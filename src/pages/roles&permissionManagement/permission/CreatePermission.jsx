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
  { label: "Interviewer", value: "Interviewer" },
  { label: "Admin", value: "Admin" },
];

const CreatePermission = ({ setOpen , selectedPermission }) => {

  console.log("selectedPermission",selectedPermission);
  

  const [loading, setLoading] = useState(false);
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      module: "",
      role: "",
    },
  });

  const { handleSubmit ,setValue } = form;

  if (selectedPermission?.id) {
    setValue("module", selectedPermission?.module);
    setValue("role", selectedPermission?.role);
  }

  const onSubmit = async (data) => {
    const { module, role } = data;
    console.log(data);

    setLoading(true);
    alert("Permission created successfully");

    setOpen(false);
  };

  return (
    <>
      {/* Create permission Form */}
      <div className="flex justify-center items-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="  max-w-5xl
            light:border-black/10 rounded-md 
            w-full space-y-8 "
          >
            <div className="grid grid-cols-1 gap-3 gap-y-4 place-content-center w-full">
              {/* module */}
              <FormField
                control={form.control}
                name="module"
                rules={{ required: "Module is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <FormLabel>Module</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter your module" {...field} />
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
                  <FormItem className="space-y-4 w-full">
                    <div className="space-y-2">
                      <div className="flex gap-2 items-center">
                        <LuUser />
                        <FormLabel>Role</FormLabel>
                      </div>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
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
              className="w-full py-2 font-semibold text-sm bg-black text-white
                hover:scale-105 duration-700
                transition-transform shadow hover:shadow-lg"
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

export default CreatePermission;
