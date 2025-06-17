// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaInfoCircle } from 'react-icons/fa';
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
// // import SubmitButton from '@/views/SubmitButton';
// // import { toast } from 'sonner';

// const AddJob = ({ open, onOpenChange }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [submittedJobs, setSubmittedJobs] = useState([]);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       jobTitle: 'Frontend Developer',
//       department: 'Engineering',
//       location: 'Remote',
//       skills: 'React, JavaScript, HTML, CSS',
//       experience: 2,
//       salary: '5-7 LPA',
//       description: 'We are looking for a skilled frontend developer to join our remote team.'
//     },
//     mode: 'onTouched'
//   });

//   const closeModel = () => {
//     onOpenChange(false);
//   };

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setSubmittedJobs(prev => [...prev, data]);
//       toast.success('Job (dummy) created successfully!');
//       console.log('Submitted Job:', data);
//       setIsLoading(false);
//       closeModel();
//     }, 1000);
//   };

//   return (

//     <Dialog open={open} onOpenChange={closeModel}>
//       <DialogContent className="max-w-screen-lg">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold">Create New Job (Static)</DialogTitle>
//             <DialogDescription className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//               <FaInfoCircle className="text-blue-500" />
//               Fill out the details to post a new job opening.
//             </DialogDescription>
//           </DialogHeader>

//           {/* Replaced DialogBody with a div wrapper */}
//           <div className="grid grid-cols-2 gap-4 py-4">
//             <div className="flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">
//                 Job Title<span className="text-red-500">*</span>
//               </label>
//               <Input type="text" {...register('jobTitle', { required: 'Job title is required' })} />
//               {errors.jobTitle && <span className="text-red-500 text-xs">{errors.jobTitle.message}</span>}
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">Department</label>
//               <Input type="text" {...register('department')} />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">Location</label>
//               <Input type="text" {...register('location')} />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">Experience (Years)</label>
//               <Input type="number" {...register('experience')} />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">Salary</label>
//               <Input type="text" {...register('salary')} />
//             </div>

//             <div className="col-span-2 flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">Skills Required</label>
//               <Textarea rows={2} {...register('skills')} />
//             </div>

//             <div className="col-span-2 flex flex-col gap-2">
//               <label className="form-label text-sm font-medium">Job Description</label>
//               <Textarea rows={4} {...register('description')} />
//             </div>
//           </div>

//           <DialogFooter className="flex justify-end gap-4">
//             <button className="btn btn-secondary" type="button" onClick={closeModel}>Cancel</button>
//             {/* <SubmitButton isLoading={isLoading} /> */}
//             <SubmitButton onClick={onSubmit} />
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export { AddJob };


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';
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
// import { toast } from 'sonner';

const SubmitButton = ({ isLoading }) => {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit'}
    </Button>
  );
};

const AddJob = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submittedJobs, setSubmittedJobs] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      jobTitle: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      skills: 'React, JavaScript, HTML, CSS',
      experience: 2,
      salary: '5-7 LPA',
      description: 'We are looking for a skilled frontend developer to join our remote team.'
    },
    mode: 'onTouched'
  });

  const closeModel = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setSubmittedJobs(prev => [...prev, data]);
      // toast.success('Job (dummy) created successfully!');
      console.log('Submitted Job:', data);
      setIsLoading(false);
      closeModel();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={closeModel}>
      <DialogContent className="max-w-screen-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create New Job (Static)</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <FaInfoCircle className="text-blue-500" />
              Fill out the details to post a new job opening.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">
                Job Title<span className="text-red-500">*</span>
              </label>
              <Input type="text" {...register('jobTitle', { required: 'Job title is required' })} />
              {errors.jobTitle && <span className="text-red-500 text-xs">{errors.jobTitle.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Department</label>
              <Input type="text" {...register('department')} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Location</label>
              <Input type="text" {...register('location')} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Experience (Years)</label>
              <Input type="number" {...register('experience')} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Salary</label>
              <Input type="text" {...register('salary')} />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Skills Required</label>
              <Textarea rows={2} {...register('skills')} />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Job Description</label>
              <Textarea rows={4} {...register('description')} />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={closeModel}>
              Cancel
            </Button>
            <SubmitButton isLoading={isLoading} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { AddJob };
