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
// import { Button } from '@/components/ui/button';
// // import { toast } from 'sonner';

// const SubmitButton = ({ isLoading }) => {
//   return (
//     <Button type="submit" disabled={isLoading}>
//       {isLoading ? 'Submitting...' : 'Submit'}
//     </Button>
//   );
// };

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
//       // toast.success('Job (dummy) created successfully!');
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

//             <div className="flex flex-col gap-2">
//   <label className="form-label text-sm font-medium">
//     Application Deadline<span className="text-red-500">*</span>
//   </label>
//   <Input
//     type="date"
//     {...register('deadline', {
//       required: 'Application deadline is required',
//       validate: value => {
//         const selected = new Date(value);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         return selected >= today || 'Deadline cannot be in the past';
//       }
//     })}
//   />
//   {errors.deadline && (
//     <span className="text-red-500 text-xs">{errors.deadline.message}</span>
//   )}
// </div>


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
//             <Button type="button" variant="secondary" onClick={closeModel}>
//               Cancel
//             </Button>
//             <SubmitButton isLoading={isLoading} />
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      jobTitle: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      skills: 'React, JavaScript, HTML, CSS',
      experience: 2,
      salary: '5-7 LPA',
      openings: 1,
      description: 'We are looking for a skilled frontend developer to join our remote team.',
      startDate: '',
      endDate: ''
    },
    mode: 'onTouched'
  });

  const closeModel = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const now = new Date();
    const endDate = new Date(data.endDate);
    const status = endDate >= now ? 'active' : 'expired';

    const jobData = {
      ...data,
      status
    };

    setTimeout(() => {
      setSubmittedJobs(prev => [...prev, jobData]);
      console.log('Submitted Job:', jobData);
      // toast.success('Job (dummy) created successfully!');
      setIsLoading(false);
      closeModel();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={closeModel}>
      <DialogContent className="max-w-screen-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create New Job</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <FaInfoCircle className="text-blue-500" />
              Fill out the details to post a new job opening.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Job Title<span className="text-red-500">*</span></label>
              <Input type="text" {...register('jobTitle', { required: 'Job title is required' })} />
              {errors.jobTitle && <span className="text-red-500 text-xs">{errors.jobTitle.message}</span>}
            </div>

            {/* Department */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Department</label>
              <Input type="text" {...register('department')} />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Location</label>
              <Input type="text" {...register('location')} />
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Experience (Years)</label>
              <Input type="number" {...register('experience')} />
            </div>

            {/* Salary */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Salary</label>
              <Input type="text" {...register('salary')} />
            </div>

            {/* Number of Openings */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Number of Openings<span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                {...register('openings', {
                  required: 'Please enter number of openings',
                  min: { value: 1, message: 'Must be at least 1' }
                })}
              />
              {errors.openings && (
                <span className="text-red-500 text-xs">{errors.openings.message}</span>
              )}
            </div>

            {/* Starting Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Starting Date<span className="text-red-500">*</span></label>
              <Input
                type="date"
                {...register('startDate', {
                  required: 'Starting date is required',
                  validate: (value) => {
                    const selected = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return selected >= today || 'Start date cannot be in the past';
                  }
                })}
              />
              {errors.startDate && <span className="text-red-500 text-xs">{errors.startDate.message}</span>}
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Application Deadline<span className="text-red-500">*</span></label>
              <Input
                type="date"
                {...register('endDate', {
                  required: 'Closing date is required',
                  validate: (value) => {
                    const end = new Date(value);
                    const start = new Date(watch('startDate'));
                    return end >= start || 'Closing date must be after starting date';
                  }
                })}
              />
              {errors.endDate && <span className="text-red-500 text-xs">{errors.endDate.message}</span>}
            </div>

            {/* Skills */}
            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium">Skills Required</label>
              <Textarea rows={2} {...register('skills')} />
            </div>

            {/* Description */}
            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-sm font-medium">Job Description</label>
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
