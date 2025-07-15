
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateJob, UPDATE_JOB_MUTATION } from "@/Api/Mutation";

// Date formatter utility
const formatDate = (value?: string | Date) => {
  if (!value) return "";
  const date = new Date(value);
  return !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
};

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto" variant={undefined} size={undefined}>
    {isLoading ? "Submitting..." : "Submit"}
  </Button>
);

const AddJob = ({ editingData, onSubmit: onClose }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createJob] = useMutation(CreateJob);
  const [updateJob] = useMutation(UPDATE_JOB_MUTATION);

  const form = useForm({
    defaultValues: {
      jobTitle: "",
      department: "",
      location: "",
      experience: "",
      salary: "",
      openings: 1,
      description: "",
      startDate: "",
      endDate: "",
      status: true,
    },
  });

  const { handleSubmit, reset, watch } = form;

  // Prefill on edit
  useEffect(() => {
    if (editingData) {
      reset({
        jobTitle: editingData.title || "",
        department: editingData.department || "",
        location: editingData.location || "",
        experience: editingData.experience || "",
        salary: editingData.salary?.toString() || "",
        openings: editingData.vacancy || 1,
        description: editingData.description || "",
        startDate: formatDate(editingData.posted_date),
        endDate: formatDate(editingData.closing_date),
        status: editingData.status ?? true,
      });
    }
  }, [editingData, reset]);

  const closeModal = useCallback(() => {
    if (onClose) onClose();
    reset();
  }, [onClose, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId") || "1";

const jobInput: any = {
  title: data.jobTitle,
  department: data.department,
  location: data.location,
  experience: data.experience,
  salary: parseFloat(data.salary),
  vacancy: parseInt(data.openings),
  description: data.description,
  posted_date: data.startDate,
  closing_date: data.endDate,
  status: Boolean(data.status),
};

// Only add `created_by` if it's a new job
if (!editingData?.id) {
  jobInput.created_by = parseInt(userId);
}


    try {
      if (editingData?.id) {
        await updateJob({
          variables: {
            id: editingData.id,
            data: jobInput,
          },
        });
      } else {
        await createJob({
          variables: { data: jobInput },
        });
      }

      closeModal();
    } catch (error) {
      console.error("GraphQL Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="max-w-screen-md max-h-screen overflow-y-auto p-4 sm:p-6 md:p-8">
        <DialogHeader className={undefined}>
          <DialogTitle className={undefined}>{editingData ? "Edit Job" : "Create Job"}</DialogTitle>
          <DialogDescription className={undefined}>
            {editingData
              ? "Update existing job details below."
              : "Fill in the job details to post a new job."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Title */}
              <FormField
                control={form.control}
                name="jobTitle"
                rules={{ required: "Job title is required" }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Job Title *</FormLabel>
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
                      <Input {...field} placeholder="e.g., Mumbai" />
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
                rules={{ required: "Openings required", min: { value: 1, message: "Minimum 1" } }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Openings *</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Posted Date */}
              <FormField
                control={form.control}
                name="startDate"
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Posted Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Closing Date */}
              <FormField
                control={form.control}
                name="endDate"
                rules={{
                  required: "Closing date is required",
                  validate: (value) => {
                    const start = new Date(watch("startDate"));
                    return new Date(value) >= start || "End date must be after start";
                  },
                }}
                render={({ field }) => (
                  <FormItem className={undefined}>
                    <FormLabel className={undefined}>Closing Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className={undefined} />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="col-span-full flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange} className={undefined}                      />
                    </FormControl>
                    <FormLabel className={undefined}>Mark job as active</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Job description..." rows={4} />
                  </FormControl>
                  <FormMessage className={undefined} />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={closeModal} className={undefined} size={undefined}>
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

export { AddJob };
