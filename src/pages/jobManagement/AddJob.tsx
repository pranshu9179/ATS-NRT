


// import React, { useState, useCallback } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaInfoCircle } from 'react-icons/fa';
// import { gql, useMutation } from '@apollo/client';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// // import { toast } from 'sonner'; // Uncomment if you have sonner setup

// // Define your GraphQL Mutation for adding a job
// export const AddJobMutation = gql`
//   mutation CreateJob($data: CreateJobInput!) {
//     createJob(data: $data) {
//       id
//       title
//       description
//       department
//       location
//       experience
//       salary
//       vacancy
//       status
//       posted_date
//       closing_date
//       created_at
//       created_by {
//         id
//         firstName
//         lastName
//         email
//       }
//     }
//   }
// `;

// // Helper component for the submit button to show loading state
// const SubmitButton = ({ isLoading }) => (
//   <Button type="submit" disabled={isLoading} className="bg-blue-600 text-white hover:bg-blue-700" size="default" variant="default">
//     {isLoading ? 'Submitting...' : 'Submit'}
//   </Button>
// );

// // CreateJob component for adding new job postings
// const CreateJob = ({ open, onOpenChange, onSubmit: onSubmitProp, editingData }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   // Initialize the useMutation hook for the AddJobMutation
//   const [createJob] = useMutation(AddJobMutation);

//   // Initialize react-hook-form
//   const form = useForm({ // Changed to use 'form' object directly
//     defaultValues: {
//       jobTitle: editingData?.title || '',
//       department: editingData?.department || '',
//       location: editingData?.location || '',
//       skills: editingData?.skills || '',
//       experience: editingData?.experience || '',
//       salary: editingData?.salary?.toString() || '',
//       openings: editingData?.vacancy || 1,
//       description: editingData?.description || '',
//       startDate: editingData?.posted_date ? new Date(editingData.posted_date).toISOString().split('T')[0] : '',
//       endDate: editingData?.closing_date ? new Date(editingData.closing_date).toISOString().split('T')[0] : ''
//     },
//     mode: 'onTouched'
//   });

//   const { handleSubmit, reset, watch } = form; // Destructure directly from 'form'

//   // Function to close the dialog and reset the form
//   const closeModel = useCallback(() => {
//     onOpenChange(false);
//     reset();
//   }, [onOpenChange, reset]);

//   // Handle form submission
//   const onSubmit = async (data) => {
//     setIsLoading(true);

//     try {
//       const response = await createJob({
//         variables: {
//           data: {
//             title: data.jobTitle,
//             description: data.description,
//             department: data.department,
//             location: data.location,
//             experience: data.experience.toString(),
//             salary: parseFloat(data.salary),
//             vacancy: parseInt(data.openings),
//             posted_date: data.startDate, // Sending directly as YYYY-MM-DD
//             closing_date: data.endDate,   // Sending directly as YYYY-MM-DD
//           }
//         }
//       });

//       const createdJob = response.data.createJob;

//       if (typeof onSubmitProp === 'function') {
//         onSubmitProp(createdJob);
//       }

//       // toast.success('Job created successfully!');
//       console.log('Job created successfully:', createdJob);

//       closeModel();
//     } catch (error) {
//       console.error('GraphQL Error:', error);
//       // toast.error('Failed to create job.');
//       console.error('Failed to create job:', error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={closeModel}>
//       <DialogContent className="max-w-screen-lg rounded-xl p-6 sm:p-8 shadow-2xl">
//         <DialogHeader className="mb-4">
//           <DialogTitle className="text-2xl font-bold text-gray-800">
//             {editingData ? 'Edit Job' : 'Create New Job'}
//           </DialogTitle>
//           <DialogDescription className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//             <FaInfoCircle className="text-blue-500" />
//             {editingData ? 'Adjust the details for this job opening.' : 'Fill out the details to post a new job opening.'}
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}> {/* Wrap the form with <Form {...form}> */}
//           <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
//               {/* Job Title */}
//               <FormField
//                 control={form.control}
//                 name="jobTitle"
//                 rules={{ required: 'Job title is required' }}
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Job Title<span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         id="jobTitle"
//                         type="text"
//                         placeholder="Enter job title"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Department */}
//               <FormField
//                 control={form.control}
//                 name="department"
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">Department</FormLabel>
//                     <FormControl>
//                       <Input
//                         id="department"
//                         type="text"
//                         placeholder="Enter department"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Location */}
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">Location</FormLabel>
//                     <FormControl>
//                       <Input
//                         id="location"
//                         type="text"
//                         placeholder="Enter location"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Experience */}
//               <FormField
//                 control={form.control}
//                 name="experience"
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">Experience</FormLabel>
//                     <FormControl>
//                       <Input
//                         id="experience"
//                         type="text"
//                         placeholder="e.g., 2+ years"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Salary */}
//               <FormField
//                 control={form.control}
//                 name="salary"
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">Salary</FormLabel>
//                     <FormControl>
//                       <Input
//                         id="salary"
//                         type="text"
//                         placeholder="e.g., 500000"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Number of Openings */}
//               <FormField
//                 control={form.control}
//                 name="openings"
//                 rules={{
//                   required: 'Please enter number of openings',
//                   min: { value: 1, message: 'Must be at least 1' }
//                 }}
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Number of Openings<span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         id="openings"
//                         type="number"
//                         placeholder="Enter number of openings"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Starting Date */}
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 rules={{
//                   required: 'Starting date is required',
//                   validate: (value) => {
//                     const selected = new Date(value);
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0);
//                     return selected >= today || 'Start date cannot be in the past';
//                   }
//                 }}
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Starting Date<span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         id="startDate"
//                         type="date"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Application Deadline */}
//               <FormField
//                 control={form.control}
//                 name="endDate"
//                 rules={{
//                   required: 'Closing date is required',
//                   validate: (value) => {
//                     const end = new Date(value);
//                     const start = new Date(watch('startDate'));
//                     if (!watch('startDate')) return true;
//                     return end >= start || 'Closing date must be after starting date';
//                   }
//                 }}
//                 render={({ field }) => (
//                   <FormItem className={undefined}>
//                     <FormLabel className="text-sm font-medium text-gray-700">
//                       Application Deadline<span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         id="endDate"
//                         type="date"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />

//               {/* Skills Required */}
//               <FormField
//                 control={form.control}
//                 name="skills"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1 md:col-span-2">
//                     <FormLabel className="text-sm font-medium text-gray-700">Skills Required</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         id="skills"
//                         rows={2}
//                         placeholder="e.g., React, JavaScript, HTML, CSS"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                     <p className="text-xs text-gray-500 mt-1">Note: This field is currently not sent to the API based on the provided mutation.</p>
//                   </FormItem>
//                 )}
//               />

//               {/* Job Description */}
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1 md:col-span-2">
//                     <FormLabel className="text-sm font-medium text-gray-700">Job Description</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         id="description"
//                         rows={4}
//                         placeholder="Provide a detailed job description"
//                         className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DialogFooter className="flex justify-end gap-4 mt-6">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={closeModel}
//                 className="bg-gray-200 text-gray-800 hover:bg-gray-300"
//                 size="default"
//               >
//                 Cancel
//               </Button>
//               <SubmitButton isLoading={isLoading} />
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export { CreateJob };













// import React, { useState, useCallback } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaInfoCircle } from 'react-icons/fa';
// import { gql, useMutation } from '@apollo/client';

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle
// } from '@/components/ui/dialog';

// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";

// // GraphQL Mutation
// export const AddJobMutation = gql`
//   mutation CreateJob($data: CreateJobInput!) {
//     createJob(data: $data) {
//       id
//       title
//       description
//       department
//       location
//       experience
//       salary
//       vacancy
//       status
//       posted_date
//       closing_date
//       created_at
//       created_by {
//         id
//         firstName
//         lastName
//         email
//       }
//     }
//   }
// `;

// // Button with loading state
// const SubmitButton = ({ isLoading }) => (
//   <Button
//     type="submit"
//     disabled={isLoading}
//     className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto" variant={undefined} size={undefined}  >
//     {isLoading ? 'Submitting...' : 'Submit'}
//   </Button>
// );

// // Main Component
// const CreateJob = ({ open, onOpenChange, onSubmit: onSubmitProp, editingData }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [createJob] = useMutation(AddJobMutation);

//   const form = useForm({
//     defaultValues: {
//       jobTitle: editingData?.title || '',
//       department: editingData?.department || '',
//       location: editingData?.location || '',
//       skills: editingData?.skills || '',
//       experience: editingData?.experience || '',
//       salary: editingData?.salary?.toString() || '',
//       openings: editingData?.vacancy || 1,
//       description: editingData?.description || '',
//       startDate: editingData?.posted_date ? new Date(editingData.posted_date).toISOString().split('T')[0] : '',
//       endDate: editingData?.closing_date ? new Date(editingData.closing_date).toISOString().split('T')[0] : ''
//     },
//     mode: 'onTouched'
//   });

//   const { handleSubmit, reset, watch } = form;

//   const closeModel = useCallback(() => {
//     onOpenChange(false);
//     reset();
//   }, [onOpenChange, reset]);

//   const onSubmit = async (data) => {
//     setIsLoading(true);

//     try {
//       const userId = localStorage.getItem('userId') || '1'; // Fallback to '1' if not available

//       const response = await createJob({
//         variables: {
//           data: {
//             title: data.jobTitle,
//             description: data.description,
//             department: data.department,
//             location: data.location,
//             experience: data.experience.toString(),
//             salary: parseFloat(data.salary),
//             vacancy: parseInt(data.openings),
//             posted_date: data.startDate,
//             closing_date: data.endDate,
//             created_by: parseInt(userId)
//           }
//         }
//       });

//       const createdJob = response.data.createJob;

//       if (typeof onSubmitProp === 'function') {
//         onSubmitProp(createdJob);
//       }

//       console.log('Job created successfully:', createdJob);
//       closeModel();
//     } catch (error) {
//       console.error('GraphQL Error:', error);
//       console.error('Failed to create job:', error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={closeModel}>
//       <DialogContent className="max-w-screen-md rounded-xl p-4 sm:p-6 md:p-8 shadow-xl overflow-y-auto max-h-screen">
//         <DialogHeader className="mb-4">
//           <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800">
//             {editingData ? 'Edit Job' : 'Create New Job'}
//           </DialogTitle>
//           <DialogDescription className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//             <FaInfoCircle className="text-blue-500" />
//             {editingData ? 'Adjust the job details.' : 'Fill out the form to post a new job.'}
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Each form field */}
//               {[
//                 { name: "jobTitle", label: "Job Title", placeholder: "e.g., React Developer", required: true },
//                 { name: "department", label: "Department", placeholder: "e.g., Engineering" },
//                 { name: "location", label: "Location", placeholder: "e.g., Remote" },
//                 { name: "experience", label: "Experience", placeholder: "e.g., 2+ years" },
//                 { name: "salary", label: "Salary", placeholder: "e.g., 500000" },
//                 {
//                   name: "openings",
//                   label: "Number of Openings",
//                   placeholder: "e.g., 3",
//                   type: "number",
//                   rules: { required: 'Enter number of openings', min: { value: 1, message: 'At least 1' } }
//                 },
//                 {
//                   name: "startDate",
//                   label: "Starting Date",
//                   type: "date",
//                   rules: {
//                     required: 'Start date is required',
//                     validate: (v) => {
//                       const d = new Date(v); const today = new Date(); today.setHours(0, 0, 0, 0);
//                       return d >= today || 'Cannot be in the past';
//                     }
//                   }
//                 },
//                 {
//                   name: "endDate",
//                   label: "Application Deadline",
//                   type: "date",
//                   rules: {
//                     required: 'Closing date is required',
//                     validate: (v) => {
//                       const start = new Date(watch("startDate"));
//                       const end = new Date(v);
//                       return end >= start || 'End date must be after start date';
//                     }
//                   }
//                 }
//               ].map(({ name, label, placeholder, type = "text", required, rules = {} }) => (
//                 <FormField
//                   key={name}
//                   control={form.control}
//                   name={name}
//                   rules={required ? { required: `${label} is required`, ...rules } : rules}
//                   render={({ field }) => (
//                     <FormItem className={undefined}>
//                       <FormLabel className="text-sm font-medium text-gray-700">
//                         {label}{required && <span className="text-red-500">*</span>}
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           type={type}
//                           placeholder={placeholder}
//                           className="w-full rounded border border-gray-300 px-3 py-2"
//                         />
//                       </FormControl>
//                       <FormMessage className="text-red-500 text-xs mt-1" />
//                     </FormItem>
//                   )}
//                 />
//               ))}

//               {/* Skills */}
//               <FormField
//                 control={form.control}
//                 name="skills"
//                 render={({ field }) => (
//                   <FormItem className="col-span-full">
//                     <FormLabel className="text-sm font-medium text-gray-700">Skills Required</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         {...field}
//                         rows={2}
//                         placeholder="e.g., HTML, CSS, JavaScript"
//                         className="w-full rounded border border-gray-300 px-3 py-2"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                     <p className="text-xs text-gray-500 mt-1">Note: Not sent to API currently.</p>
//                   </FormItem>
//                 )}
//               />

//               {/* Description */}
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem className="col-span-full">
//                     <FormLabel className="text-sm font-medium text-gray-700">Job Description</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         {...field}
//                         rows={4}
//                         placeholder="Enter job description"
//                         className="w-full rounded border border-gray-300 px-3 py-2"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500 text-xs mt-1" />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={closeModel}
//                 className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto" size={undefined}              >
//                 Cancel
//               </Button>
//               <SubmitButton isLoading={isLoading} />
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export { CreateJob };














import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { AddJob } from '@/Api/Mutation';

// ✅ GraphQL Mutation
// const AddJobMutation = gql`
//   mutation CreateJob($data: CreateJobInput!) {
//     createJob(data: $data) {
//       id
//       title
//       description
//       department
//       location
//       experience
//       salary
//       vacancy
//       status
//       posted_date
//       closing_date
//       created_at
//       created_by {
//         id
//         firstName
//         lastName
//         email
//       }
//     }
//   }
// `;

// ✅ Submit button with loading state
const SubmitButton = ({ isLoading }) => (
  <Button
    type="submit"
    disabled={isLoading}
    className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto" variant={undefined} size={undefined}  >
    {isLoading ? 'Submitting...' : 'Submit'}
  </Button>
);

// ✅ Main component
const CreateJob = ({ open, onOpenChange, onSubmit: onSubmitProp, editingData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createJob] = useMutation(AddJob);

  // ✅ Setup form
  const form = useForm({
    defaultValues: {
      jobTitle: editingData?.title || '',
      department: editingData?.department || '',
      location: editingData?.location || '',
      experience: editingData?.experience || '',
      salary: editingData?.salary?.toString() || '',
      openings: editingData?.vacancy || 1,
      description: editingData?.description || '',
      startDate: editingData?.posted_date
        ? new Date(editingData.posted_date).toISOString().split('T')[0]
        : '',
      endDate: editingData?.closing_date
        ? new Date(editingData.closing_date).toISOString().split('T')[0]
        : '',
      status: editingData?.status ?? true
    },
    mode: 'onTouched'
  });

  const { handleSubmit, reset, watch } = form;

  // ✅ Close and reset dialog
  const closeModel = useCallback(() => {
    onOpenChange(false);
    reset();
  }, [onOpenChange, reset]);

  // ✅ Submit form
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId') || '1';

      const response = await createJob({
        variables: {
          data: {
            title: data.jobTitle,
            description: data.description,
            department: data.department,
            location: data.location,
            experience: data.experience,
            salary: parseFloat(data.salary),
            vacancy: parseInt(data.openings),
            posted_date: data.startDate,
            closing_date: data.endDate,
            created_by: parseInt(userId),
            status: Boolean(data.status),
          }
        }
      });

      if (onSubmitProp) onSubmitProp(response.data.createJob);
      closeModel();
    } catch (error) {
      console.error('GraphQL Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeModel}>
      <DialogContent className="max-w-screen-md p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto rounded-xl shadow-xl">
        <DialogHeader className={undefined}>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {editingData ? 'Edit Job' : 'Create New Job'}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Fill in the required details to post a new job opening.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Title */}
              <FormField
                control={form.control}
                name="jobTitle"
                rules={{ required: 'Job title is required' }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Job Title<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., React Developer" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Department */}
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Department</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Engineering" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Remote" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Experience */}
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Experience</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2+ years" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Salary */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Salary</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="e.g., 600000" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Openings */}
              <FormField
                control={form.control}
                name="openings"
                rules={{
                  required: 'Enter number of openings',
                  min: { value: 1, message: 'Must be at least 1' },
                }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Openings<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                rules={{
                  required: 'Start date is required',
                  validate: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return new Date(value) >= today || 'Start date cannot be in the past';
                  },
                }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Start Date<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                rules={{
                  required: 'End date is required',
                  validate: (value) => {
                    const start = new Date(watch('startDate'));
                    return new Date(value) >= start || 'End date must be after start date';
                  },
                }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>End Date<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Status Checkbox */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="col-span-full flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className={undefined} />
                    </FormControl>
                    <FormLabel className={undefined}>Mark job as active</FormLabel>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{ required: 'Job description is required' }}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel className={undefined}>Job Description<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Describe the job responsibilities and requirements" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={closeModel}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto" size={undefined}              >
                Cancel
              </Button>
              <SubmitButton isLoading={isLoading} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateJob };
