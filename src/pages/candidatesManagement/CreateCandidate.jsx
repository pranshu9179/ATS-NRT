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

const SubmitButton = ({ isLoading }) => {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit'}
    </Button>
  );
};

const CreateCandidate = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submittedCandidates, setSubmittedCandidates] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      experience: '',
      resumeLink: '',
      skills: '',
      notes: ''
    },
    mode: 'onTouched'
  });

  const closeModel = () => {
    onOpenChange(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setSubmittedCandidates(prev => [...prev, data]);
      console.log('Submitted Candidate:', data);
      setIsLoading(false);
      closeModel();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={closeModel}>
      <DialogContent className="max-w-screen-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Candidate (Static)</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <FaInfoCircle className="text-blue-500" />
              Fill out the details to add a new candidate to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">
                Full Name<span className="text-red-500">*</span>
              </label>
              <Input type="text" {...register('name', { required: 'Full name is required' })} />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <Input type="email" {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Phone Number</label>
              <Input type="text" {...register('phone')} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Experience (Years)</label>
              <Input type="number" {...register('experience')} />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Resume Link</label>
              <Input type="url" {...register('resumeLink')} />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Skills</label>
              <Textarea rows={2} {...register('skills')} />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <label className="form-label text-sm font-medium">Additional Notes</label>
              <Textarea rows={3} {...register('notes')} />
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

export { CreateCandidate };
