import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";


const EducationSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    degree: "",
    branch: "",
    institution: "",
    year: "",
  });
  const [editIndex, setEditIndex] = useState(null); // null = new entry, number = edit index

  const handleSave = () => {
    if (
      !formData.degree.trim() ||
      !formData.institution.trim() ||
      !formData.year.trim()
    ) {
      alert("Please fill required fields");
      return;
    }

    if (editIndex !== null) {
      // Edit mode
      const updated = [...educations];
      updated[editIndex] = formData;
      setEducations(updated);
    } else {
      // Add new
      setEducations([...educations, formData]);
    }

    setFormData({ degree: "", branch: "", institution: "", year: "" });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({ degree: "", branch: "", institution: "", year: "" });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(educations[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
    if (editIndex === index) {
      // If deleted item was being edited
      handleCancel();
    }
  };

  return (
    <Card className="p-6 space-y-4 dark:text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Education</h2>
        <Button
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setShowForm(true);
            }
          } }
          variant="outline"
          className="dark:border-white dark:text-white flex items-center gap-2" size={undefined}        >
          <FaPlus />
          {showForm
            ? editIndex !== null
              ? "Cancel Edit"
              : "Cancel Add Education"
            : "Add Education"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#f1f5f9] dark:bg-[#111] p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">
            {editIndex !== null ? "Edit Education" : "Add New Education"}
          </h3>

          <div>
            <label className="font-medium block mb-1">Degree/Qualification</label>
            <Input
              placeholder="e.g., Bachelor of Technology"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="dark:text-white" type={undefined}            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              Branch/Specialization
            </label>
            <Input
              placeholder="e.g., Computer Science"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="dark:text-white" type={undefined}            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              University/Institution/School
            </label>
            <Input
              placeholder="e.g., NIT Bhopal"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="dark:text-white" type={undefined}            />
          </div>

          <div>
            <label className="font-medium block mb-1">Year of Completion</label>
            <Input
              placeholder="e.g., 2024"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="dark:text-white" type={undefined}            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="dark:border-white dark:text-white" size={undefined}            >
              Cancel
            </Button>
            <Button onClick={handleSave} className={undefined} variant={undefined} size={undefined}>
              {editIndex !== null ? "Update Education" : "Add Education"}
            </Button>
          </div>
        </div>
      )}

      {/* List */}
      {educations.length > 0 ? (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl flex justify-between items-center  dark:text-white"
            >
              <div>
                <p className="font-semibold text-lg">
                  {edu.degree}
                  {edu.branch && ` (${edu.branch})`}
                </p>
                <p className="text-blue-600 dark:text-blue-400">
                  {edu.institution} - {edu.year}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(index)}
                  className="dark:border-white dark:text-white" size={undefined}                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(index)} className={undefined} size={undefined}>
                  Delete
                </Button>
              </div>
            </div>

          ))}
        </div>
      ) : (
        !showForm && (
          <p className="text-gray-600 dark:text-gray-400">
            No education details added yet.
          </p>
        )
      )}
    </Card>
  );
};

export default EducationSection;
