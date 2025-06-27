// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
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
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useLazyQuery } from "@apollo/client";
// import { PermissionList } from "@/Api/Query";

// const permissionsSchema = [
//   {
//     name: "dashboard",
//     label: "Dashboard",
//     actions: ["read"],
//   },
//   {
//     name: "candidates",
//     label: "Candidates",
//     actions: ["read", "create", "update", "delete"],
//   },
//   {
//     name: "jobs",
//     label: "Job Postings",
//     actions: ["read", "create", "update", "delete"],
//   },

//   {
//     name: "interviews",
//     label: "Interviews",
//     actions: ["read", "schedule", "reschedule", "cancel"],
//   },
// ];

// const userType = [
//   { label: "HR", value: "HR" },
//   { label: "Interviewer", value: "INTERVIEWER" },
//   { label: "Admin", value: "ADMIN" },
// ];

// interface Props {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const CreateRoles = ({ setOpen }: Props) => {
//   const navigate = useNavigate();
//   const [listPermission, { data }] = useLazyQuery(PermissionList);

//   const mainPermission = data?.permissionList?.data ?? [];

//   useEffect(() => {
//     listPermission();
//   }, []);

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       permissions: {},
//       userType: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Form data:", data);
//     form.reset();
//     setOpen(false);
//   };

//   return (
//     <>
//       <div className="">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div className=" grid grid-cols-2 gap-2 p-1">
//               {/*name*/}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 rules={{ required: "Name is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-1">
//                         <FormLabel className={undefined}>Name</FormLabel>
//                       </div>
//                       <FormControl>
//                         <Input placeholder="Enter name" {...field} />
//                       </FormControl>
//                       <FormMessage className={undefined} />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* userType */}
//               <FormField
//                 control={form.control}
//                 name="userType"
//                 rules={{ required: "userType is required" }}
//                 render={({ field }) => (
//                   <FormItem className="space-y-4">
//                     <div className="space-y-2 ">
//                       <FormLabel className={undefined}>UserType</FormLabel>
//                       <FormControl>
//                         <Select
//                           value={field.value}
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger className="w-[220px]">
//                             <SelectValue placeholder="Select userType" />
//                           </SelectTrigger>
//                           <SelectContent className={undefined}>
//                             {userType.map((role) => (
//                               <SelectItem
//                                 key={role.value}
//                                 value={role.value}
//                                 className={undefined}
//                               >
//                                 {role.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage className={undefined} />
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* <div className="space-y-3">
//               {permissionsSchema.map((module) => {
//                 const allChecked = module.actions.every((action) =>
//                   form.watch(`permissions.${module.name}.${action}`)
//                 );

//                 const someChecked = module.actions.some((action) =>
//                   form.watch(`permissions.${module.name}.${action}`)
//                 );

//                 const toggleAll = (checked) => {
//                   module.actions.forEach((action) => {
//                     form.setValue(
//                       `permissions.${module.name}.${action}`,
//                       checked
//                     );
//                   });
//                 };

//                 return (
//                   <div
//                     key={module.name}
//                     className="space-y-5 border border-black/10 p-4 rounded-md"
//                   >
                   
//                     <div className="flex items-center gap-2">
//                       <Checkbox
//                         checked={allChecked}
//                         indeterminate={!allChecked && someChecked}
//                         onCheckedChange={toggleAll}
//                         className={undefined}
//                       />
//                       <span className="text-[15px] font-medium">
//                         {module.label}
//                       </span>
//                     </div>

                   
//                     <div className="grid grid-cols-4 gap-2">
//                       {module.actions.map((action) => (
//                         <FormField
//                           key={`${module.name}.${action}`}
//                           control={form.control}
//                           name={`permissions.${module.name}.${action}`}
//                           render={({ field }) => (
//                             <FormItem className="flex flex-row items-center gap-2">
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value || false}
//                                   onCheckedChange={field.onChange}
//                                   className={undefined}
//                                 />
//                               </FormControl>
//                               <FormLabel className="text-sm font-normal capitalize">
//                                 {action.replace("_", " ")}
//                               </FormLabel>
//                             </FormItem>
//                           )}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div> */}

//             <Button
//               type="submit"
//               className={undefined}
//               variant={undefined}
//               size={undefined}
//             >
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default CreateRoles;


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLazyQuery } from "@apollo/client";
import { PermissionList } from "@/Api/Query";

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

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoles = ({ setOpen }: Props) => {
  const navigate = useNavigate();
  const [listPermission, { data }] = useLazyQuery(PermissionList);

  const mainPermission = data?.permissionList?.data ?? [];

  useEffect(() => {
    listPermission();
  }, []);

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
    setOpen(false);
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
                        <FormLabel className={undefined}>Name</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage className={undefined} />
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
                      <FormLabel className={undefined}>UserType</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Select userType" />
                          </SelectTrigger>
                          <SelectContent className={undefined}>
                            {userType.map((role) => (
                              <SelectItem
                                key={role.value}
                                value={role.value}
                                className={undefined}
                              >
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

            {/* <div className="space-y-3">
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
                   
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={allChecked}
                        indeterminate={!allChecked && someChecked}
                        onCheckedChange={toggleAll}
                        className={undefined}
                      />
                      <span className="text-[15px] font-medium">
                        {module.label}
                      </span>
                    </div>

                   
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
                                  className={undefined}
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
            </div> */}

            <Button
              type="submit"
              className={undefined}
              variant={undefined}
              size={undefined}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateRoles;


