// import React from "react";
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
// import { useMutation } from "@apollo/client";
// import { CreateRoleApi } from "@/Api/Mutation";

// type FormValues = {
//   name: string;
//   userType: string;
//   permissions: {
//     [key: string]: {
//       [action: string]: boolean;
//     };
//   };
// };

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

// const CreateRoles = () => {
//   const navigate = useNavigate();
//   const [CreateRole, { data, loading, error }] = useMutation(CreateRoleApi);

//   const form = useForm<FormValues>({
//     defaultValues: {
//       name: "",
//       userType: "",
//       permissions: {},
//     },
//   });

// const onSubmit = async (data: FormValues) => {
//   try {
//     const formattedPermissions = Object.entries(data.permissions).map(
//       ([module, actions]) => ({
//         module,
//         actions: Object.entries(actions)
//           .filter(([_, value]) => value)
//           .map(([action]) => action),
//       })
//     );

//     const response = await CreateRole({
//       variables: {
//         input: {
//           name: data.name,
//           userType: data.userType,
//           permissions: formattedPermissions,
//         },
//       },
//     });

//     if (response?.data?.createRole) {
//       navigate("/dashboard");
//     } else {
//       // setStatus("Failed to create role");
//     }
//   } catch (err) {
//     console.error(err);
//     // setStatus("Server error");
//   }
// };

//   return (
//     <div className="w-full max-w-7xl mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4 p-1">
//             {/* Name */}
//             <FormField
//               control={form.control}
//               name="name"
//               rules={{ required: "Name is required" }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <FormLabel className={undefined}>Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter name" {...field} />
//                     </FormControl>
//                     <FormMessage className={undefined} />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             {/* User Type */}
//             <FormField
//               control={form.control}
//               name="userType"
//               rules={{ required: "User Type is required" }}
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <div className="space-y-2">
//                     <FormLabel className={undefined}>User Type</FormLabel>
//                     <FormControl>
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="w-[565px]">
//                           <SelectValue placeholder="Select user type" />
//                         </SelectTrigger>
//                         <SelectContent className={undefined} >
//                           {userType.map((role) => (
//                             <SelectItem key={role.value} value={role.value} className={undefined} >
//                               {role.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage className={undefined} />
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Permissions */}
//           <div className="space-y-3">
//             {permissionsSchema.map((module) => {
//               const allChecked = module.actions.every((action) =>
//                 form.watch(`permissions.${module.name}.${action}` as const)
//               );

//               const someChecked = module.actions.some((action) =>
//                 form.watch(`permissions.${module.name}.${action}` as const)
//               );

//               const toggleAll = (checked: boolean | "indeterminate") => {
//                 const isChecked = checked === true;
//                 module.actions.forEach((action) => {
//                   form.setValue(
//                     `permissions.${module.name}.${action}` as const,
//                     isChecked
//                   );
//                 });
//               };

//               return (
//                 <div
//                   key={module.name}
//                   className="space-y-5 border border-black/10 p-4 rounded-md"
//                 >
//                   {/* Module Label with master checkbox */}
//                   <div className="flex items-center gap-2">
//                     <Checkbox
//                       checked={allChecked}
//                       onCheckedChange={toggleAll} className={undefined}                      // Manually handle indeterminate if needed via ref
//                     />
//                     <span className="text-[15px] font-medium">
//                       {module.label}
//                     </span>
//                   </div>

//                   {/* Individual Permissions */}
//                   <div className="grid grid-cols-4 gap-2">
//                     {module.actions.map((action) => (
//                       <FormField
//                         key={`${module.name}.${action}`}
//                         control={form.control}
//                         name={`permissions.${module.name}.${action}` as const}
//                         render={({ field }) => (
//                           <FormItem className="flex items-center gap-2">
//                             <FormControl>
//                               <Checkbox
//                                 checked={field.value || false}
//                                 onCheckedChange={field.onChange} className={undefined}                              />
//                             </FormControl>
//                             <FormLabel className="text-sm font-normal capitalize">
//                               {action.replace("_", " ")}
//                             </FormLabel>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Submit Button */}
//           <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit</Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CreateRoles;

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
// import { useMutation, gql } from "@apollo/client";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // ✅ GraphQL Mutation
// const CREATE_ROLE_API = gql`
//   mutation CreateRole($input: CreateRoleInput!) {
//     createRole(input: $input) {
//       id
//       name
//       slug
//       description
//       status
//       userType
//       created_at
//       updated_at
//       permissions {
//         id
//         name
//         slug
//       }
//     }
//   }
// `;

// // Permissions schema
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

// // Select options
// const userTypeOptions = [
//   { label: "HR", },
//   { label: "Interviewer", },
//   { label: "Admin",  },
// ];

// // Validation schema
// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   userType: z.string().min(1, "User Type is required"),
//   permissions: z.record(z.record(z.boolean())),
// });

// type FormValues = z.infer<typeof formSchema>;

// type CreateRolesProps = {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedRole?: string; // Optional prop for selected role
// };

// const CreateRoles: React.FC<CreateRolesProps> = ({ setOpen ,selectedRole}) => {

//   console.log("Selected Role:", selectedRole);
//   // const CreateRoles: React.FC = () => {
//   const navigate = useNavigate();
//   const [createRole, { loading }] = useMutation(CREATE_ROLE_API);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       userType: "",
//       permissions: {},
//     },
//     mode: "onChange",
//   });

//   useEffect(() => {
//     form.setValue("name",selectedRole?.name);
//     form.setValue("userType", selectedRole?.userType);
    
//   }, []);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       const selectedPermissionSlugs: string[] = [];

//       for (const [module, actions] of Object.entries(data.permissions)) {
//         for (const [action, isSelected] of Object.entries(actions)) {
//           if (isSelected) {
//             selectedPermissionSlugs.push(`${module}_${action}`);
//           }
//         }
//       }
//       const response = await createRole({
//         variables: {
//           input: {
//             name: data.name,
//             userType: data.userType,
//             status: true,
//           },
//         },
//       });

//       if (response?.data?.createRole) {
//         form.reset();
//         navigate("/dashboard");
//       } else {
//         console.error("Failed to create role:", response);
//       }
//     } catch (err) {
//       console.error("Error creating role:", err);
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4 p-1">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className={undefined}>
//                   <FormLabel className={undefined}>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter name" {...field} />
//                   </FormControl>
//                   <FormMessage className={undefined} />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="userType"
//               render={({ field }) => (
//                 <FormItem className={undefined}>
//                   <FormLabel className={undefined}>User Type</FormLabel>
//                   <FormControl>
//                     <Select
//                       onValueChange={(val) => {
//                         field.onChange(val);
//                         form.setValue("permissions", {});
//                       }}
//                       value={field.label}
//                     >
//                       <SelectTrigger className={undefined}>
//                         <SelectValue placeholder="Select user type" />
//                       </SelectTrigger>
//                       <SelectContent className={undefined}>
//                         {userTypeOptions.map((role) => (
//                           <SelectItem
//                             key={role.label}
//                             value={role.label}
//                             className={undefined}
//                           >
//                             {role.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage className={undefined} />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Permissions */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Permissions</h3>
//             {permissionsSchema.map((module) => {
//               const allChecked = module.actions.every((action) =>
//                 form.watch(`permissions.${module.name}.${action}` as const)
//               );

//               const isIndeterminate =
//                 module.actions.some((action) =>
//                   form.watch(`permissions.${module.name}.${action}` as const)
//                 ) && !allChecked;

//               const toggleAll = (checked: boolean | "indeterminate") => {
//                 const isChecked = checked === true;
//                 module.actions.forEach((action) => {
//                   form.setValue(
//                     `permissions.${module.name}.${action}` as const,
//                     isChecked,
//                     { shouldValidate: true }
//                   );
//                 });
//               };

//               return (
//                 <div
//                   key={module.name}
//                   className="border border-black/10 p-4 rounded-md space-y-3"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Checkbox
//                       className={undefined}
//                       checked={allChecked}
//                       onCheckedChange={toggleAll}
//                       {...(isIndeterminate && { indeterminate: true })}
//                     />
//                     <span className="text-base font-semibold">
//                       {module.label}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                     {module.actions.map((action) => (
//                       <FormField
//                         key={`${module.name}.${action}`}
//                         control={form.control}
//                         name={`permissions.${module.name}.${action}` as const}
//                         render={({ field }) => (
//                           <FormItem className="flex items-center gap-2 space-y-0">
//                             <FormControl>
//                               <Checkbox
//                                 checked={field.value || false}
//                                 onCheckedChange={field.onChange}
//                                 className={undefined}
//                               />
//                             </FormControl>
//                             <FormLabel className="capitalize text-sm font-normal cursor-pointer">
//                               {action.replace("_", " ")}
//                             </FormLabel>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Actions */}
//           <div className="flex gap-4 pt-4">
//             <Button
//               type="submit"
//               disabled={loading}
//               className={undefined}
//               variant={undefined}
//               size={undefined}
//             >
//               {loading ? "Creating..." : "Create Role"}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate("/dashboard")}
//               className={undefined}
//               size={undefined}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CreateRoles;











// ✅ CreateRoles.tsx (Updated)

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
// import { useMutation, gql } from "@apollo/client";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const CREATE_ROLE_API = gql`
//   mutation CreateRole($input: CreateRoleInput!) {
//     createRole(input: $input) {
//       id
//       name
//       slug
//       description
//       status
//       userType
//       created_at
//       updated_at
//       permissions {
//         id
//         name
//         slug
//       }
//     }
//   }
// `;

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

// const userTypeOptions = [
//   { label: "HR" },
//   { label: "Interviewer" },
//   { label: "Admin" },
// ];

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   userType: z.string().min(1, "User Type is required"),
//   permissions: z.record(z.record(z.boolean())),
// });

// type FormValues = z.infer<typeof formSchema>;

// type CreateRolesProps = {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedRole?: any;
// };

// const CreateRoles: React.FC<CreateRolesProps> = ({ setOpen, selectedRole }) => {
//   const navigate = useNavigate();
//   const [createRole, { loading }] = useMutation(CREATE_ROLE_API);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       userType: "",
//       permissions: {},
//     },
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (selectedRole) {
//       form.setValue("name", selectedRole.name || "");
//       form.setValue("userType", selectedRole.userType || "");
//     }
//   }, [selectedRole]);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       const selectedPermissionSlugs: string[] = [];

//       for (const [module, actions] of Object.entries(data.permissions)) {
//         for (const [action, isSelected] of Object.entries(actions)) {
//           if (isSelected) {
//             selectedPermissionSlugs.push(`${module}_${action}`);
//           }
//         }
//       }

//       const response = await createRole({
//         variables: {
//           input: {
//             name: data.name,
//             userType: data.userType,
//             status: true,
//           },
//         },
//       });

//       if (response?.data?.createRole) {
//         form.reset();
//         navigate("/dashboard");
//       } else {
//         console.error("Failed to create role:", response);
//       }
//     } catch (err) {
//       console.error("Error creating role:", err);
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4 p-1">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className={undefined}>
//                   <FormLabel className={undefined}>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter name" {...field} />
//                   </FormControl>
//                   <FormMessage className={undefined} />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="userType"
//               render={({ field }) => (
//                 <FormItem className={undefined}>
//                   <FormLabel className={undefined}>User Type</FormLabel>
//                   <FormControl>
//                     <Select
//                       onValueChange={(val) => {
//                         field.onChange(val);
//                         form.setValue("permissions", {});
//                       }}
//                       value={field.value}
//                     >
//                       <SelectTrigger className={undefined} >
//                         <SelectValue placeholder="Select user type" />
//                       </SelectTrigger>
//                       <SelectContent className={undefined}>
//                         {userTypeOptions.map((role) => (
//                           <SelectItem
//                             key={role.label}
//                             value={role.label} className={undefined}                         >
//                             {role.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage className={undefined} />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Permissions</h3>
//             {permissionsSchema.map((module) => {
//               const allChecked = module.actions.every((action) =>
//                 form.watch(`permissions.${module.name}.${action}` as const)
//               );

//               const isIndeterminate =
//                 module.actions.some((action) =>
//                   form.watch(`permissions.${module.name}.${action}` as const)
//                 ) && !allChecked;

//               const toggleAll = (checked: boolean | "indeterminate") => {
//                 const isChecked = checked === true;
//                 module.actions.forEach((action) => {
//                   form.setValue(
//                     `permissions.${module.name}.${action}` as const,
//                     isChecked,
//                     { shouldValidate: true }
//                   );
//                 });
//               };

//               return (
//                 <div
//                   key={module.name}
//                   className="border border-black/10 p-4 rounded-md space-y-3"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Checkbox
//                       checked={allChecked}
//                       onCheckedChange={toggleAll}
//                       indeterminate={isIndeterminate} className={undefined}                    />
//                     <span className="text-base font-semibold">
//                       {module.label}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                     {module.actions.map((action) => (
//                       <FormField
//                         key={`${module.name}.${action}`}
//                         control={form.control}
//                         name={`permissions.${module.name}.${action}` as const}
//                         render={({ field }) => (
//                           <FormItem className="flex items-center gap-2 space-y-0">
//                             <FormControl>
//                               <Checkbox
//                                 checked={field.value || false}
//                                 onCheckedChange={field.onChange} className={undefined}                              />
//                             </FormControl>
//                             <FormLabel className="capitalize text-sm font-normal cursor-pointer">
//                               {action.replace("_", " ")}
//                             </FormLabel>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex gap-4 pt-4">
//             <Button type="submit" disabled={loading} className={undefined} variant={undefined} size={undefined}>
//               {loading ? "Creating..." : "Create Role"}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate("/dashboard")} className={undefined} size={undefined}            >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CreateRoles;





// ✅ CreateRoles.tsx (Updated with font size + justify-between)

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
import { useMutation, gql } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CREATE_ROLE_API = gql`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
      name
      slug
      description
      status
      userType
      created_at
      updated_at
      permissions {
        id
        name
        slug
      }
    }
  }
`;

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

const userTypeOptions = [
  { label: "HR" },
  { label: "Interviewer" },
  { label: "Admin" },
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userType: z.string().min(1, "User Type is required"),
  permissions: z.record(z.record(z.boolean())),
});

type FormValues = z.infer<typeof formSchema>;

type CreateRolesProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRole?: any;
};

const CreateRoles: React.FC<CreateRolesProps> = ({ setOpen, selectedRole }) => {
  const navigate = useNavigate();
  const [createRole, { loading }] = useMutation(CREATE_ROLE_API);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      userType: "",
      permissions: {},
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedRole) {
      form.setValue("name", selectedRole.name || "");
      form.setValue("userType", selectedRole.userType || "");
    }
  }, [selectedRole]);

  const onSubmit = async (data: FormValues) => {
    try {
      const selectedPermissionSlugs: string[] = [];

      for (const [module, actions] of Object.entries(data.permissions)) {
        for (const [action, isSelected] of Object.entries(actions)) {
          if (isSelected) {
            selectedPermissionSlugs.push(`${module}_${action}`);
          }
        }
      }

      const response = await createRole({
        variables: {
          input: {
            name: data.name,
            userType: data.userType,
            status: true,
          },
        },
      });

      if (response?.data?.createRole) {
        form.reset();
        navigate("/dashboard");
      } else {
        console.error("Failed to create role:", response);
      }
    } catch (err) {
      console.error("Error creating role:", err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between gap-4 p-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage className={undefined} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>User Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("permissions", {});
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className={undefined}>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent className={undefined} >
                        {userTypeOptions.map((role) => (
                          <SelectItem key={role.label} value={role.label} className={undefined} >
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className={undefined} />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permissions</h3>
            {permissionsSchema.map((module) => {
              const allChecked = module.actions.every((action) =>
                form.watch(`permissions.${module.name}.${action}` as const)
              );

              const isIndeterminate =
                module.actions.some((action) =>
                  form.watch(`permissions.${module.name}.${action}` as const)
                ) && !allChecked;

              const toggleAll = (checked: boolean | "indeterminate") => {
                const isChecked = checked === true;
                module.actions.forEach((action) => {
                  form.setValue(
                    `permissions.${module.name}.${action}` as const,
                    isChecked,
                    { shouldValidate: true }
                  );
                });
              };

              return (
                <div
                  key={module.name}
                  className="border border-black/10 p-4 rounded-md space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={allChecked}
                      onCheckedChange={toggleAll}
                      indeterminate={isIndeterminate} className={undefined}    />
                    <span className="text-base font-semibold">
                      {module.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {module.actions.map((action) => (
                      <FormField
                        key={`${module.name}.${action}`}
                        control={form.control}
                        name={`permissions.${module.name}.${action}` as const}
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value || false}
                                onCheckedChange={field.onChange} className={undefined}                              />
                            </FormControl>
                            <FormLabel className="capitalize text-sm font-normal cursor-pointer">
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className={undefined} variant={undefined} size={undefined}>
              {loading ? "Creating..." : "Create Role"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")} className={undefined} size={undefined}            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoles;
