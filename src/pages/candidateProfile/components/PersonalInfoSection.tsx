import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FaEdit, FaPlus } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const PersonalInfoSection = ({ onProfileUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    dob: null,
    gender: "",
    summary: "",
  });

  const handleSave = () => {
    setPersonalInfo(formData);
    setShowForm(false);
    setIsEditing(true);

    // ⬆ Update parent
    if (onProfileUpdate) {
      const { fullName, email, phone } = formData;
      onProfileUpdate({ fullName, email, phone });
    }
  };

  const handleEdit = () => setShowForm(true);

  const handleCancel = () => {
    setShowForm(false);
    if (!personalInfo) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        github: "",
        linkedin: "",
        dob: null,
        gender: "",
        summary: "",
      });
    }
  };

  return (
    <Card className="p-4 space-y-4 dark:text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Personal Information</h2>
        {!showForm && (
          personalInfo ? (
            <Button variant="outline" onClick={handleEdit} className="dark:border-white dark:text-white" size={undefined}>
              <FaEdit className="mr-2" /> Edit
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setShowForm(true)} className="dark:border-white dark:text-white" size={undefined}>
              <FaPlus className="mr-2" /> Add Personal Info
            </Button>
          )
        )}
      </div>

      {showForm && (
        <div className="bg-[#f1f5f9] dark:bg-[#111] space-y-4 p-4 rounded-lg">
          <div>
            <label className="font-medium">Full Name</label>
            <Input
              className="dark:border-gray-600 dark:text-white"
              placeholder="e.g., Alex Johnson"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} type={undefined}            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <Input
              type="email"
              className="dark:border-gray-600 dark:text-white"
              placeholder="e.g., alex.johnson@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="font-medium">Phone</label>
            <Input
              type="tel"
              className="dark:border-gray-600 dark:text-white"
              placeholder="e.g., +1 555 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

        <div className="space-y-2">
          <label htmlFor="dob" className="font-medium">Date of Birth</label>
          <Input
            type="date"
            className="dark:border-gray-600 dark:text-white"
            id="dob"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>


          <div>
            <label className="font-medium">Gender</label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger className="w-full dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className={undefined}>
                <SelectItem value="Male" className={undefined}>Male</SelectItem>
                <SelectItem value="Female" className={undefined}>Female</SelectItem>
                <SelectItem value="Other" className={undefined}>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-medium">GitHub</label>
            <Input
              type="url"
              className="dark:border-gray-600 dark:text-white"
              placeholder="e.g., https://github.com/username"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            />
          </div>
          <div>
            <label className="font-medium">LinkedIn</label>
            <Input
              type="url"
              className="dark:border-gray-600 dark:text-white"
              placeholder="e.g., https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className="font-medium">Professional Summary</label>
            <Textarea
              className="dark:border-gray-600 dark:text-white"
              placeholder="Write a short summary about yourself..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={handleCancel} className="dark:border-white dark:text-white" size={undefined}>Cancel</Button>
            <Button onClick={handleSave} className={undefined} variant={undefined} size={undefined}>Save Info</Button>
          </div>
        </div>
      )}

      {!showForm && personalInfo && (
        <div className="space-y-2 p-4 rounded-lg">
          <p><strong>Full Name:</strong> {personalInfo.fullName}</p>
          <p><strong>Email:</strong> {personalInfo.email}</p>
          <p><strong>Phone:</strong> {personalInfo.phone}</p>
          <p><strong>Date of Birth:</strong> {personalInfo.dob ? format(personalInfo.dob, "PPP") : "Not set"}</p>
          <p><strong>Gender:</strong> {personalInfo.gender}</p>
          <p><strong>GitHub:</strong> <a href={personalInfo.github} target="_blank" className="text-blue-500 underline">{personalInfo.github}</a></p>
          <p><strong>LinkedIn:</strong> <a href={personalInfo.linkedin} target="_blank" className="text-blue-500 underline">{personalInfo.linkedin}</a></p>
          <p><strong>Summary:</strong> {personalInfo.summary}</p>
        </div>
      )}

      {(!personalInfo || showForm) && (
        <p className="text-gray-600 dark:text-gray-300">
          Please fill in your personal details to complete your profile.
        </p>
      )}
    </Card>
  );
};

export default PersonalInfoSection;
