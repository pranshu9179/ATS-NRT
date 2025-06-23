import React from "react";
import { useForm } from "react-hook-form";
import SidebarWrapper from "@/layouts/Sidebar";
import { useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { UserCog, ShieldCheck, Users, Settings } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const permissionsSchema = [
  {
    name: "dashboard",
    label: "Dashboard",
    actions: ["read"],
  },
  {
    name: "candidates",
    label: "Candidates",
    actions: ["read", "create", "update", "delete"],
  },
  {
    name: "jobs",
    label: "Job Postings",
    actions: ["read", "create", "update", "delete"],
  },

  {
    name: "interviews",
    label: "Interviews",
    actions: ["read", "schedule", "reschedule", "cancel"],
  },
];

const userType = [
  { label: "HR", value: "HR" },
  { label: "Interviewer", value: "INTERVIEWER" },
  { label: "Admin", value: "ADMIN" },
];

const CreateRoles = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      permissions: {},
      userType: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    form.reset();
    navigate("/dashboard");
  };

  return (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className=" grid grid-cols-2 gap-2 p-1">
              {/*name*/}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <FormLabel>Name</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* userType */}
              <FormField
                control={form.control}
                name="userType"
                rules={{ required: "userType is required" }}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2 ">
                      <FormLabel>UserType</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select userType" />
                          </SelectTrigger>
                          <SelectContent>
                            {userType.map((role) => (
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

            {/* Permissions with Select All logic */}
            <div className="space-y-3">
              {permissionsSchema.map((module) => {
                const allChecked = module.actions.every((action) =>
                  form.watch(`permissions.${module.name}.${action}`)
                );

                const someChecked = module.actions.some((action) =>
                  form.watch(`permissions.${module.name}.${action}`)
                );

                const toggleAll = (checked) => {
                  module.actions.forEach((action) => {
                    form.setValue(
                      `permissions.${module.name}.${action}`,
                      checked
                    );
                  });
                };

                return (
                  <div
                    key={module.name}
                    className="space-y-5 border border-black/10 p-4 rounded-md"
                  >
                    {/* Label + Select All Checkbox */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={allChecked}
                        indeterminate={!allChecked && someChecked}
                        onCheckedChange={toggleAll}
                      />
                      <span className="text-[15px] font-medium">
                        {module.label}
                      </span>
                    </div>

                    {/* Action checkboxes */}
                    <div className="grid grid-cols-4 gap-2">
                      {module.actions.map((action) => (
                        <FormField
                          key={`${module.name}.${action}`}
                          control={form.control}
                          name={`permissions.${module.name}.${action}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal capitalize">
                                {action.replace("_", " ")}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateRoles;
