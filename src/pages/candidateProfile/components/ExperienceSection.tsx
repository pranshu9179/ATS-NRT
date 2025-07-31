import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FaEdit, FaPlus } from "react-icons/fa";

const ExperienceSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [experience, setExperience] = useState(null);

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  });

  const handleSave = () => {
    setExperience(formData);
    setShowForm(false);
    setIsEditing(true);
  };

  const handleEdit = () => setShowForm(true);
  const handleCancel = () => {
    setShowForm(false);
    if (!experience) setFormData({
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    });
  };

  return (
    <Card className="p-4 space-y-4 dark:text-white ">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Experience</h2>
        {!showForm && (
          experience ? (
            <Button variant="outline" onClick={handleEdit} className="dark:border-white dark:text-white" size={undefined}>
              <FaEdit className="mr-2" /> Edit
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setShowForm(true)} className="dark:border-white dark:text-white" size={undefined}>
              <FaPlus className="mr-2" /> Add Experience
            </Button>
          )
        )}
      </div>

      {showForm && (
        <div className="bg-[#f1f5f9] dark:bg-[#111] space-y-4 p-4 rounded-lg">
          <div>
            <label className="font-medium">Job Title</label>
            <Input
              className="dark:border-gray-600 dark:text-white "
              placeholder="e.g., Software Developer"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} type={undefined}            />
          </div>
          <div>
            <label className="font-medium">Company</label>
            <Input
              className="dark:border-gray-600 dark:text-white "
              placeholder="e.g., Tech Solutions Inc."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })} type={undefined}            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Start Date</label>
              <Input
                type="date"
                className="dark:border-gray-600 dark:text-white "
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="font-medium">End Date</label>
              <Input
                type="date"
                className="dark:border-gray-600 dark:text-white "
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.currentlyWorking}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData.currentlyWorking}
              onCheckedChange={(checked) => setFormData({ ...formData, currentlyWorking: checked, endDate: "" })} className={undefined}            />
            <span className="dark:text-white">Currently working here</span>
          </div>
          <div>
            <label className="font-medium">Description (Key Responsibilities/Achievements)</label>
            <Textarea
              className="dark:border-gray-600 dark:text-white "
              placeholder="Describe your roles and achievements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={handleCancel} className="dark:border-white dark:text-white" size={undefined}>Cancel</Button>
            <Button onClick={handleSave} className={undefined} variant={undefined} size={undefined}>Save Experience</Button>
          </div>
        </div>
      )}

      {!showForm && experience && (
        <div className="space-y-2 p-4 rounded-lg">
          <p><strong>Job Title:</strong> {experience.jobTitle}</p>
          <p><strong>Company:</strong> {experience.company}</p>
          <p><strong>Duration:</strong> {experience.startDate} to {experience.currentlyWorking ? "Present" : experience.endDate}</p>
          <p><strong>Description:</strong> {experience.description}</p>
        </div>
      )}

      {/* ✅ Paragraph will always show until experience is saved */}
      {(!experience || showForm) && (
        <p className="text-gray-600 dark:text-gray-300 ">
          No work experience added yet. As a fresher, you can add internship details here.
        </p>
      )}
    </Card>
  );
};

export default ExperienceSection;

